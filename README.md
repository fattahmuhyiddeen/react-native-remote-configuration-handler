# react-native-remote-configuration-handler
Your app need configuration remotely? This library can handle it for you, retry if fails, and many more feature you can suggest to me to add

### Usage sample

This code

```
import { AsyncStorage } from 'react-native';

<RemoteConfiguration 
  storage={AsyncStorage} 
  onDataChanged={data => alert(JSON.stringify(data))} 
  url="https://example.com/api/settings" 
/>
```


### Properties

| Prop                    | Type                   | Description                                                                                                        | Default     | Required                                                                                              |
| ----------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------- |
| `url`                   | string                 | URl to fetch the remote configuration. That URL must return a JSON                                                 | `undefined` | Required                                                                                              |
| `onDataChanged`         | function               | Will be called when successfully get response from the URL. Will return what ever JSON returned                    | `undefined` | Required                                                                                              |
| `retryInSeconds`        | integer                | Number of seconds to retry if fail. If set to 0, means no retry                                                    | 8           | Optional                                                                                              |
| `storage`               | AsyncStorage component | If supplied, all remote configuration will be persisted and reloaded when user open app next time                  | `undefined` | Optional                                                                                              |
| `onPersistedDataLoaded` | function               | Will be called on the first time when the app is loaded, if this prop is defined and also if `storage` is defined. | `undefined` | Optional                                                                                              |
| `request`               | object                 | HTTP Request configuration                                                                                         | Optional    | ```headers: {         Accept: 'application/json',       'Content-Type': 'application/json',      }``` |