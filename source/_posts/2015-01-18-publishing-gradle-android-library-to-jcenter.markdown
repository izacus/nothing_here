---
layout: post
title: "Publishing Gradle Android library to jCenter repository"
date: 2015-01-18 14:22:32 +0100
comments: true
categories: 
 - android
 - helpful tips
 - gradle
 - jcenter
---

Publishing Gradle AAR libraries is one of the bigger pain points with Android's new build system - it's not as integrated and direct as it is with the Maven build system. Pretty much anyone has his/hers own solution to this problem and here is mine based on published [FuzzyDateFormatter][2] library.


## 1. Generate JavaDoc and source JARs

Both Maven Central and jCenter require you to publish a JavaDoc and Source JARs for your public projects. We're going to use `android-maven-plugin` to generate those.

Add required build dependencies to your top-level `build.gradle` file:

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:1.0.0'
        classpath 'com.github.dcendents:android-maven-plugin:1.2'
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        jcenter()
    }
}
```

and add javadoc and source jar generation tasks to your project's `build.gradle`:

```groovy
apply plugin: 'com.android.library'
apply plugin: 'com.github.dcendents.android-maven'
apply plugin: 'com.jfrog.bintray'

// This is the library version used when deploying the artifact
version = "1.0.0"

android {
    compileSdkVersion 21
    buildToolsVersion "21.1.2"
    resourcePrefix "fuzzydatetime__"

    defaultConfig {
        minSdkVersion 9
        targetSdkVersion 21
        versionCode 1
        versionName version

    }
    buildTypes {
    }
}

def siteUrl = 'https://github.com/izacus/FuzzyDateFormatter'      // Homepage URL of the library
def gitUrl = 'https://github.com/izacus/FuzzyDateFormatter.git'   // Git repository URL
group = "<maven group id>"                                        // Maven Group ID for the artifact


install {
    repositories.mavenInstaller {
    	// This generates POM.xml with proper parameters
        pom {
            project {
                packaging 'aar'
                
                // Add your description here
                name '<Your library description>'
                url siteUrl
                
                // Set your license
                licenses {
                    license {
                        name 'The Apache Software License, Version 2.0'
                        url 'http://www.apache.org/licenses/LICENSE-2.0.txt'
                    }
                }
                developers {
                    developer {
                        id '<your user ID>'
                        name '<your name>'
                        email '<your email>'
                    }
                }
                scm {
                    connection gitUrl
                    developerConnection gitUrl
                    url siteUrl

                }
            }
        }
    }
}

dependencies {
}

task sourcesJar(type: Jar) {
    from android.sourceSets.main.java.srcDirs
    classifier = 'sources'
}

task javadoc(type: Javadoc) {
    source = android.sourceSets.main.java.srcDirs
    classpath += project.files(android.getBootClasspath().join(File.pathSeparator))
}

task javadocJar(type: Jar, dependsOn: javadoc) {
    classifier = 'javadoc'
    from javadoc.destinationDir
}
artifacts {
    archives javadocJar
    archives sourcesJar
}
```

And with that you have Maven part of deployment done - you can run `./gradlew install` and it'll install the AAR to your local M2 repository.

## 2. Setup BinTray upload

For bintray we will use their official gradle plugin.

Add it to the main `build.gradle` as a dependency:

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:1.0.0'
        classpath 'com.jfrog.bintray.gradle:gradle-bintray-plugin:1.0'
        classpath 'com.github.dcendents:android-maven-plugin:1.2'
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        jcenter()
    }
}
```

and add bintray configuration to your libraries `build.gradle`:

```groovy
Properties properties = new Properties()
properties.load(project.rootProject.file('local.properties').newDataInputStream())

bintray {
    user = properties.getProperty("bintray.user")
    key = properties.getProperty("bintray.apikey")

    configurations = ['archives']
    pkg {
        repo = "maven"
        name = "<Your library name>"
        websiteUrl = siteUrl
        vcsUrl = gitUrl
        licenses = ["Apache-2.0"]
        publish = true
    }
}
```

Note that your BinTray APIkey is going to be read from `local.properties` file which **should not** be commited to the Git repository.

## 3. Register on [BinTray.com][1]

To actually upload the artifact you need to create a [BinTray.com][1] account. After you create it, you'll have repository `maven` created by default. Now you just need to get your API key - click on your username -> API key.

Then add required data to your `local.properties` file:

```
bintray.user=<your bintray username>
bintray.apikey=<your bintray API key>
```

After that you can upload and publish the artifact by simply running
```bash
./gradew bintrayUpload
```

The first time you publish your library, you'll have to open the BinTray site, click on your package and click on `Maven Central`. This will requiest a review and public listing of your library on jCenter repository.

For a full example examine the source of [FuzzyDateFormatter][2].


[1]: https://bintray.com/
[2]: https://github.com/izacus/FuzzyDateFormatter
