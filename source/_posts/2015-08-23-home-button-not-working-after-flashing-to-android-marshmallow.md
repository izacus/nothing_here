title: Home button not working after flashing to Android Marshmallow
date: 2015-08-23 13:45:21
categories:
   - Android
   - Helpful tips
tags:
   - android
   - marshmallow 
---
If you updated your device from Android 5.1 to 6.0 without wiping all data you noticed that the quick setting and home button have stopped working. That because the OS thinks the setup wizard is running and it's trying to prevent you from escaping it. If you check logcat you'll see a  `Not starting activity because user setup is in progress` message when you press the home button.
To get rid of the issue, you have to manually start the setup wizard so it sets the "initial setup succeeded" flag. On Android 6.0 the activity is called `SetupWizardTestActivity` and can be invoked via adb with:

```bash
adb shell am start -n com.google.android.setupwizard/.SetupWizardTestActivity
```

Click through the wizard and the issue will disappear.

<!-- more -->