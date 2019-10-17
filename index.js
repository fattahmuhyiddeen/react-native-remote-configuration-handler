import React from 'react';

const storageKey = 'react-native-remote-configuration';

const getData = (storage, onSuccess) => storage.getItem(storageKey, data => onSuccess(JSON.parse(data)));

const getRemoteConfiguration = (url, requestHeader, onSuccess, onFail) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = e => {
    if (xhr.readyState !== 4) {
      return;
    }

    if (xhr.status === 200) {
      onSuccess(JSON.parse(xhr.responseText));
    }
  };

  xhr.open(requestHeader.method, url);
  xhr.onerror = onFail;
  xhr.send();
};

export default class RemoteConfiguration extends React.PureComponent {
  static defaultProps = {
    retryInSeconds: 8,
    request: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  };

  constructor(props, defaultProps) {
    super(props, defaultProps);
    props.storage && getData(props.storage, props.onPersistedDataLoaded);
    this.getRemoteConfiguration();
  }

  getRemoteConfiguration = () => {
    const { retryInSeconds, url, request, onDataChanged } = this.props;
    getRemoteConfiguration(url, request, onDataChanged, !retryInSeconds ? () => null : () => setTimeout(this.getRemoteConfiguration, retryInSeconds * 1000));
  }

  render() {
    return null;
  }
}