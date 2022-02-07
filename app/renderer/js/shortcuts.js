document.onkeydown = (e) => {
  switch (e.key) {
    case "F12":
      const totalAmount = document.getElementById("total-amount").value;
      const articlesQuantity = getAllItemSession().length;
      const dataSell = {
        totalAmount,
        articlesQuantity,
      };
      ipcRenderer.send("load-payment-window", dataSell);
      break;
    case 'F10':
        ipcRenderer.send("load-search-products-window");
        break; 
    case 'F5':
        clearProductList();
        break;
    default:
      break;
  };
};
