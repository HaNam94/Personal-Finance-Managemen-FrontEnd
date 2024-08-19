function SettingForm({formik}) {
    console.log(formik.values)
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="row">
                <div className="col-6">
                    <div className="mb-3">
                        <label>Tiền tệ</label>
                        <select
                            name="currency"
                            id="currency"
                            onChange={formik.handleChange}
                            value={formik.values.currency}
                            className="form-select"
                        >
                            <option value="AUD">AUD - AUSTRALIAN DOLLAR</option>
<option value="CAD">CAD - CANADIAN DOLLAR</option>
<option value="CHF">CHF - SWISS FRANC</option>
<option value="CNY">CNY - YUAN RENMINBI</option>
<option value="DKK">DKK - DANISH KRONE</option>
<option value="EUR">EUR - EURO</option>
<option value="GBP">GBP - POUND STERLING</option>
<option value="HKD">HKD - HONGKONG DOLLAR</option>
<option value="INR">INR - INDIAN RUPEE</option>
<option value="JPY">JPY - YEN</option>
<option value="KRW">KRW - KOREAN WON</option>
<option value="KWD">KWD - KUWAITI DINAR</option>
<option value="MYR">MYR - MALAYSIAN RINGGIT</option>
<option value="NOK">NOK - NORWEGIAN KRONER</option>
<option value="RUB">RUB - RUSSIAN RUBLE</option>
<option value="SAR">SAR - SAUDI RIAL</option>
<option value="SEK">SEK - SWEDISH KRONA</option>
<option value="SGD">SGD - SINGAPORE DOLLAR</option>
<option value="THB">THB - THAILAND BAHT</option>
<option value="USD">USD - US DOLLAR</option>
<option value="VND">VND - VIETNAMESE DONG</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label>Định dạng hiển thị tiền</label>
                        <select
                            name="formatCurrency"
                            id="formatCurrency"
                            onChange={formik.handleChange}
                            value={formik.values.formatCurrency}
                            className="form-select"
                        >
                            <option value="vi">100.000 ₫</option>
                            <option value="en">$100,000</option>
                        </select>
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label>Định dạng ngày</label>
                        <select
                            name="formatDate"
                            id="formatDate"
                            onChange={formik.handleChange}
                            value={formik.values.formatDate}
                            className="form-select"
                        >
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                        </select>
                    </div>
                </div>
            </div>


            <div className="text-end">
                <button type="submit" className="btn btn-success mx-2 px-4 btn-sm" disabled={formik.isSubmitting}>Cập
                    Nhật
                </button>

            </div>
        </form>

    )
}

export default SettingForm;