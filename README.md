## How to use:

### 1. Install the plugin in Insomnia.

Applications->Preferences->Plugins

NPM package name: "insomnia-plugin-shein-request-signer"

### 2. Setup the environment variable.

```
{
	"openKeyId": "your openKeyId",
	"secretKey": "your secretKey",
	"host": "https://openapi-test01.sheincorp.cn"
}
```

### 3. Enable request signature.
For the requests that require the signature, you'll need to include the header `x-shein-headers` with the value true.

![image](https://user-images.githubusercontent.com/5866775/236988711-a043c858-21e2-4876-a41b-879354d0f67c.png)
