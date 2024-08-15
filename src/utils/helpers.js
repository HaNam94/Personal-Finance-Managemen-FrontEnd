import {Flip, toast} from "react-toastify";

const appColors = [
  '#ffa755',
  '#b48dd3',
  '#68e365',
  '#709fba',
  '#496ecc',
  '#5bcfc5',
]
class Helper {
  static exchangeRates;
  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static toastSuccess(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  }
  static toastError(message) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  }
  static formatDate(date) {
    // format 2024-07-05
    return date.toISOString().slice(0, 10);
  }

  static formatDateVi(dateStr) {
    const date = new Date(dateStr);
    const options = {year: "numeric", month: "2-digit", day: "2-digit"};
    return date.toLocaleDateString("vi-VN", options);
  }

  static formatPrice(price) {
    return price.toLocaleString("vi-VN", {style: "currency", currency: "VND"});
  }

  static imageHostUrl(imagePath) {
    return "http://localhost:8080/images/" + imagePath;
  }

  static showApiError(data) {

    let message = "";
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        message += `${key}: ${data[key]}, `;
      }
    }


    Helper.toastError(message);

  }

  static parseError(error) {
    console.log(error);
    if(error.code == "ERR_NETWORK") {
      Helper.toastError("Lỗi mạng hoặc server không hoạt động!");
      return;
    }
    if(error.response && error.response.data && error.response.data.message) {
      Helper.toastError(error.response.data.message);
      return;
    }
    if (error.response.data) {
      let mes = "";
      for (const [key, value] of Object.entries(error.response.data)) {
        mes += `${value}.`;
       
      }
      Helper.toastError(mes)
    }
  }

  static formatNumber(value) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      maximumFractionDigits: 2,
    }).format(value);
  };

  static parseNumber(value) {
    return value.replace(/\./g, '').replace(/,/g, '') // Remove commas for numeric parsing
  };

  static parseFloat(value) {
    //value is "24,870.00"
    return Number.parseFloat(value.replace(',', ''));
  }

  static groupBy(arr, key) {
    return arr.reduce((acc, item) => {
      const group = item[key];
      acc[group] = (acc[group] || []).concat(item);
      return acc;
    }, {});
  }

  static sortStringDate(arr) {
    return arr.sort((a, b) => {
      const [day, month, year] = a.split("-");
      const [day1, month1, year1] = b.split("-");
      const date = new Date(`${year}-${month}-${day}T00:00:00`);
      const date1 = new Date(`${year1}-${month1}-${day1}T00:00:00`);
      return date1 - date;
    });
  }

  static async vcbExchangeRates() {
    if (!Helper.exchangeRates) {
      const response = await fetch('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10');
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const exrateList = Array.from(xmlDoc.getElementsByTagName('Exrate')).map((exrate) => ({
        currencyCode: exrate.getAttribute('CurrencyCode'),
        currencyName: exrate.getAttribute('CurrencyName'),
        buy: exrate.getAttribute('Buy'),
        transfer: exrate.getAttribute('Transfer'),
        sell: exrate.getAttribute('Sell'),
      }));
      Helper.exchangeRates = exrateList;
    }
    return Helper.exchangeRates;
  }

  static getColorByIndex(index) {
    return appColors[index];
  }
  static getArrayColor(length) {
    return Array.from({length}, (_, index) => Helper.getColorByIndex(index));
  }
}

export default Helper;