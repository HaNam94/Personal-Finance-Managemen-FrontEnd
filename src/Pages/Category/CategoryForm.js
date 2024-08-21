import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function CategoryForm({formik, isCreate = false }) {

  const { t } = useTranslation();
  const categoryTypeOptions = [{type: "income", name: "Thu", value: 1}, {type: "outcome", name: "Chi", value: 0}].map(el => {
    return (
      <option key={el.value} value={el.value}>
        {el.name}
      </option>
    );
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-12 col-lg-6">
          {
            ('categoryType' in formik.values && (formik.values.parentId == null)) &&
            <div className="mb-3">
              <label>{t("categoryType")}</label>
              <select
                name="categoryType"
                id="categoryType"
                onChange={formik.handleChange}
                value={formik.values.categoryType}
                className="form-select"
              >
                <option value="">{t("chooseCategory")}</option>
                {categoryTypeOptions}
              </select>
              {formik.touched.categoryType && formik.errors.categoryType ?
                <div className="text-danger">{formik.errors.categoryType}</div> : null}
            </div>
          }

          <div className="mb-3">
            <label>{t("categoryName")}</label>
            <input
              className="form-control"
              id="categoryName"
              name="categoryName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.categoryName}
            />
            {formik.touched.categoryName && formik.errors.categoryName ?
              <div className="text-danger">{formik.errors.categoryName}</div> : null}
          </div>
          <div className="mb-3">
            <label>{t("note")}</label>
            <input
              className="form-control"
              id="note"
              name="note"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.note}
            />
            {formik.touched.note && formik.errors.note ?
              <div className="text-danger">{formik.errors.note}</div> : null}
          </div>

        </div>
        <div className="col-12 col-lg-6">
          <div className="mb-3">
            <div className="mb-3">
              <label>{t("categoryIcon")}</label>
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


      <div className="text-end">
          <Link to={"/categories"} className="btn btn-secondary btn-sm">{t("cancel")}</Link>
          <button type="submit" className="btn btn-success mx-2 px-4 btn-sm" disabled={formik.isSubmitting}>
            {
              isCreate ? t("add") : t("update")
            }
          </button>
      </div>
    </form>
  )
}

export default CategoryForm;