title: Use ccache with CMake for faster compilation
date: 2015-07-21 21:39:54
tags:
    - c++
    - 'tips & tricks'
    - cmake
    - NDK
    - Android
---

C and C++ compilers aren't the fastest pieces of software out there and there's [no lack of programmer jokes](https://xkcd.com/303/) based on tedium of waiting for their work to complete.

There are ways to fix the pain though - one of them is [ccache](https://ccache.samba.org). CCache improves compilation times by caching previously built object files in private cache and reusing them when you're recompiling same objects with same parameters. Obviously it will not help if you're compiling the code for the first time and it also won't help if you often change compilation flags. Most C/C++ development however involves recompiling same object files with the same parameters and ccache helps alot.

For illustration, here's the comparison of first and subsequent compilation times of a largish C++ project:

```bash Original run with empty cache
make -j9
...
real    0m56.684s
user    5m31.996s
sys     0m41.638s
```

```bash Recompilation with warm cache
make -j9
...
real    0m5.929s
user    0m11.896s
sys     0m8.722s
```

### Installation

CCache is available in repositories on pretty much all distributions. On OS X use homebrew:

```bash
brew install ccache
```

and on Debian-based distros use apt:

```bash
apt-get install ccache
```

### CMake configuration

After ccache is installed, you need to tell CMake to use it as a wrapper for the compiler. Add these lines to your `CMakeLists.txt`:

```cmake
# Configure CCache if available
find_program(CCACHE_FOUND ccache)
if(CCACHE_FOUND)
        set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE ccache)
        set_property(GLOBAL PROPERTY RULE_LAUNCH_LINK ccache)
endif(CCACHE_FOUND)
```

Rerun `cmake` and next `make` should use ccache for wrapper.

### Usage with Android NDK

CCache can even be used on Android NDK - you just need to export `NDK_CCACHE` environment variable with path to ccache binary. `ndk-build` script will automatically use it. E.g.

```bash
export NDK_CCACHE=/usr/local/bin/ccache
ndk-build -j9
```

(Note that on Debian/Ubuntu the path will probably be `/usr/bin/ccache`)

### CCache statistics

<!-- more -->

To see if ccache is really working, you can use `ccache -s` command, which will display ccache statistics:

```text
cache directory                     /Users/jernej/.ccache
primary config                      /Users/jernej/.ccache/ccache.conf
secondary config      (readonly)    /usr/local/Cellar/ccache/3.2.2/etc/ccache.conf
cache hit (direct)                 77826
cache hit (preprocessed)           17603
cache miss                         46999
called for link                       18
compile failed                        45
ccache internal error                  1
preprocessor error                    62
unsupported source language          204
files in cache                     48189
cache size                           1.2 GB
max cache size                      20.0 GB
```

On second and all subsequent compilations the "cache hit" values should increase and thus show that ccache is working.





