    // QRコードを生成するテキストまたはURL
    const qrText = "https://r.gnavi.co.jp/g924800/";
  
    // QRコードを描画するcanvas要素を取得
    const qrcodeDiv = document.getElementById("qrcode");
  
    // QRコード生成オプション
    const qrOptions = {
      // QRコードの種類 (0 - 自動検出, 1 - 数字, 2 - 英数字, 3 - 8ビットバイト)
      typeNumber: 0,
      // QRコードの誤り訂正レベル (L - 7%, M - 15%, Q - 25%, H - 30%)
      errorCorrectionLevel: "H",
    };
  
    // QRコードを生成
    const qrCode = qrcode(0, qrOptions.errorCorrectionLevel);
    qrCode.addData(qrText);
    qrCode.make();
  
  // SVG形式のQRコードを取得
  const svgData = qrCode.createSvgTag();

  // div要素にSVG形式のQRコードを描画
  qrcodeDiv.innerHTML = svgData;
