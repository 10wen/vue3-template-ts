
class MyUploadAdapter {
  loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  upload(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loader.file.then(async (file: File) => {
        // const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
        // let obj = {
        //   file: file,
        //   lang: "zh_HK",
        //   type: "news",
        //   accessToken: userInfo.accessToken,
        //   apiUrl: apiConfig.uploadImage,
        // };
        // const data = await uploadApiEvent(obj);
        // if (data.errorCode == "0000") {
        //   resolve({ default: data.result.fullName });
        //   console.log("Upload Success");
        // } else {
        //   reject(data.errorMessage);
        //   console.log("Upload Error");
        // }
      });
    });
  }
  abort(): void {
    console.log("Abort upload.");
  };
}

function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader);
  };
}

export { MyUploadAdapter, MyCustomUploadAdapterPlugin };
