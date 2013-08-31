---
title: Enumerate physical drives in Windows
author: Jernej Virag
layout: post
permalink: /2010/02/enumerate-physical-drives-in-windows/
categories:
  - Computer stuff
  - Helpful tips
tags:
  - 'C#'
  - physical drive
  - programming
  - winapi
  
---
Sometimes you need to find a list of all existing physical drives, so you can access them through Win32 device namespace for direct access.

There is currently no [WinApi][1] call to do this, so device list has to be retrieved through QueryDosDevice call and then enumerated to find all PhysicalDisks. Here is an example in C#:

``` csharp
// Native WINAPI functions to retrieve list of devices
private const int ERROR_INSUFFICIENT_BUFFER = 0x7A;

[DllImport("kernel32.dll", SetLastError = true)]
private static extern uint QueryDosDevice(string lpDeviceName, IntPtr lpTargetPath, int ucchMax);

/// &lt;summary&gt;
/// Retrieves list of all "PhysicalDrive" identifiers on the system, depicting plugged in PhysicalDrives
/// &lt;/summary&gt;
/// List of "PhysicalDriveX" strings of plugged in drives
private static List&lt;string&gt; GetPhysicalDriveList()
{
	uint returnSize = 0;
	// Arbitrary initial buffer size
	int maxResponseSize = 100;
	
	IntPtr response = IntPtr.Zero;
	
	string allDevices = null;
	string[] devices = null;

	while (returnSize == 0)
	{
		// Allocate response buffer for native call
		response = Marshal.AllocHGlobal(maxResponseSize);
		
		// Check out of memory condition
		if (response != IntPtr.Zero)
		{
		    try
		    {
		        // List DOS devices
		        returnSize = QueryDosDevice(null, response, maxResponseSize);
		
		        // List success
		        if (returnSize != 0)
		        {
		            // Result is returned as null-char delimited multistring
		            // Dereference it from ANSI charset
		            allDevices = Marshal.PtrToStringAnsi(response, maxResponseSize);
		        }
		        // The response buffer is too small, reallocate it exponentially and retry
		        else if (Marshal.GetLastWin32Error() == ERROR_INSUFFICIENT_BUFFER)
		        {
		            maxResponseSize = (int)(maxResponseSize * 5);
		        }
		        // Fatal error has occured, throw exception
		        else
		        {
		            Marshal.ThrowExceptionForHR(Marshal.GetLastWin32Error());
		        }
		    }
		    finally
		    {
		        // Always free the allocated response buffer
		        Marshal.FreeHGlobal(response);
		    }
		}
		else
		{
		    throw new OutOfMemoryException("Out of memory when allocating space for QueryDosDevice command!");
		}
	}
	
	// Split zero-character delimited multi-string
	devices = allDevices.Split('\0');
	// QueryDosDevices lists alot of devices, return only PhysicalDrives
	return devices.Where(device =&gt; device.StartsWith("PhysicalDrive")).ToList&lt;string&gt;();
}
```

This returns list of `PhysicalDriveX` strings which represent all physical drives (CD-ROMs excluded) present on the system, including those, that have no mounted volumes.

 [1]: http://en.wikipedia.org/wiki/Windows_API