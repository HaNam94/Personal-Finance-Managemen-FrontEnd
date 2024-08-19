import {Link} from "react-router-dom";

function WalletForm({formik, isUpdate = false, deleteBtn = <></>, isReadOnly = false}) {

  const currencyOptions = ["VND", "USD"].map(el => {
    return (
      <option key={el} value={el}>
        {el}
      </option>
    );
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-6">
          <div className="mb-3">
            <label>Tên ví</label>
            <input
              className="form-control"
              id="walletName"
              name="walletName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.walletName}
              disabled={isReadOnly}
            />
            {formik.touched.walletName && formik.errors.walletName ?
              <div className="text-danger">{formik.errors.walletName}</div> : null}
          </div>
          <div className="mb-3">
            <label>Tiền hiện có</label>
            <input
              className="form-control"
              id="amount"
              name="amount"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.amount}
              disabled={isReadOnly}
            />
            {formik.touched.amount && formik.errors.amount ?
              <div className="text-danger">{formik.errors.amount}</div> : null}
          </div>
          <div className="mb-3">
            <label>Loại tiền tệ</label>
            <select
              name="currency"
              id="currency"
              onChange={formik.handleChange}
              value={formik.values.currency}
              className="form-select"
              disabled={isReadOnly || isUpdate}
            >
              <option value="">Chọn một loại tiền tệ</option>
              {currencyOptions}
            </select>
            {formik.touched.currency && formik.errors.currency ?
              <div className="text-danger">{formik.errors.currency}</div> : null}
          </div>
          <div className="mb-3">
            <label>Mô tả ví</label>
            <input
              className="form-control"
              id="walletDescription"
              name="walletDescription"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.walletDescription}
              disabled={isReadOnly}
            />
            {formik.touched.walletDescription && formik.errors.walletDescription ?
              <div className="text-danger">{formik.errors.walletDescription}</div> : null}
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <div className="mb-3">
              <label>Icon ví</label>
              <div className="d-flex flex-wrap box-icon">
                {Array.from({length: 142}, (_, i) => `icon_${i}`).map((option) => (
                  <div key={option} className="icon-item">
                    <input
                      type="radio"
                      id={option}
                      name="icon"
                      value={option}
                      onChange={formik.handleChange}
                      checked={formik.values.icon === option}
                      className="d-none"
                      disabled={isReadOnly}
                    />
                    <label htmlFor={option}>
                      <img src={"/images/icons/" + option + ".png"} className="img-fluid" />
                    </label>
                  </div>
                ))}
              </div>
              {formik.touched.icon && formik.errors.icon ?
                <div className="text-danger">{formik.errors.icon}</div> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between">
        <div>
          {deleteBtn}
        </div>

        <div>
          <Link to={"/wallets"} className="btn btn-secondary btn-sm">Hủy</Link>
          <button type="submit" className="btn btn-primary btn-sm ms-2" disabled={isReadOnly}>{isUpdate ? "Cập Nhật" : "Tạo mới"}</button>
        </div>
      </div>
    </form>
  );
}

export default WalletForm;
