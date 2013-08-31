---
title: Dispatching operations to UI thread in Silverlight
author: Jernej Virag
layout: post
permalink: /2010/05/dispatching-operations-to-ui-thread-in-silverlight/
wp_jd_target:
  - http://bit.ly/d8bZju
wp_jd_bitly:
  - http://bit.ly/d8bZju
jd_tweet_this:
  - yes
jd_wp_twitter:
  - ' New post: Dispatching operations to UI thread in Silverlight http://bit.ly/d8bZju'
categories:
  - Computer stuff
  - Helpful tips
tags:
  - 'C#'
  - programming
  - silverlight
  - 'tips & tricks'
  
---
When programming on Silverlight it is quite common to create additional threads to handle background processing, client-server communication and similar non-interactive tasks.

Quite often work of those threads also has to interact with the user interface (either it has to display a progress report or it simply creates objects that interact with the user interface eg. Canvas). Problem is, that trying to access GUI elements from any other than UI thread will cause *Invalid cross-thread access* exception and the program will stop.

The simple way to fix this is to simply do all the processing in the UI thread, but mostly that is not a practical solution.

The proper way to deal with this situation is to dispatch the requested UI-related operation to the UI thread using the **Dispatcher** class. For example, if you want to update a displayed progress bar the code to update it from a background thread would look like this:

``` csharp
public void BackgroundProcessor
{
    while(_doWork)
    {
        // Do some heavy work
        Deployment.Current.Dispatcher.BeginInvoke( () =>
        {
            // Set progress bar value to current progress
            MainForm.ProgressBar.Value = _currentProgress;
        }
    }
}
```

Keep the dispatched routine short to ensure the maximum responsiveness of the UI for the user. Also keep in mind that the dispatched method will be executed asynchronously and will thus continue execution in the background thread immediately after the BeginInvoke call without waiting for the dispatched method to execute.