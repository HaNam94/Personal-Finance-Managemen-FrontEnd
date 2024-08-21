import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Select from "react-select";
import Helper from "../../utils/helpers";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

function BudgetForm({formik, isUpdate = false}) {
  const { t } = useTranslation();
  const outcomeCategories = useSelector((state) => state.category.outcomeCategories);
  const [selectedOptionCategory, setSelectedOptionCategory] = useState(null);

  const handleSelectCategoryChange = (selectedOption) => {
    setSelectedOptionCategory(selectedOption);
    formik.setFieldValue('categoryId', selectedOption? selectedOption.id : '');
  };

  useEffect(() => {
    if(selectedOptionCategory == null && formik.values.categoryId) {
      console.log("xxxx")
      setSelectedOptionCategory(
          outcomeCategories.find((c) => c.id === formik.values.categoryId)
      );
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-6">
          <div className="mb-3">
            <label>{t("nameBudget")}</label>
            <input
                className="form-control"
                id="budgetName"
                name="budgetName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.budgetName}
            />
            {formik.touched.budgetName && formik.errors.budgetName ?
                <div className="text-danger">{formik.errors.budgetName}</div> : null}
          </div>

          <div className="mb-3">
            <label>{t("budget")}</label>
            <input
                className="form-control"
                id="budgetAmount"
                name="budgetAmount"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.budgetAmount}
            />
            {formik.touched.budgetAmount && formik.errors.budgetAmount ?
                <div className="text-danger">{formik.errors.budgetAmount}</div> : null}
          </div>
          <div className="mb-3">
            <label>{t("describe")}</label>
            <input
                className="form-control"
                id="budgetDescription"
                name="budgetDescription"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.budgetDescription}
            />
            {formik.touched.budgetDescription && formik.errors.budgetDescription ?
                <div className="text-danger">{formik.errors.budgetDescription}</div> : null}
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label>{t("chooseType")}</label>
            <Select

                defaultValue={0}
                onChange={handleSelectCategoryChange}
                name="categoryId"
                value={selectedOptionCategory}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.categoryName}
                options={outcomeCategories}
                components={{Option: Helper.customOptionSelect, SingleValue: Helper.customSingleValueSelect}}

                styles={Helper.customStylesSelect}
            />
            {formik.touched.categoryId && formik.errors.categoryId ?
                <div className="text-danger">{formik.errors.categoryId}</div> : null}
          </div>
          <div className="mb-3">
            <label>{t("typeMoney")}</label>
            <select
                name="currency"
                id="currency"
                onChange={formik.handleChange}
                value={formik.values.currency}
                disabled={isUpdate}
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


        </div>

      </div>


      <div className="text-end">
        <Link to={"/budgets"} className="btn btn-secondary btn-sm">{t("cancel")}</Link>
        <button type="submit" className="btn btn-success mx-2 px-4 btn-sm"
                disabled={formik.isSubmitting}>{isUpdate ? t("update") : t("add")}
        </button>
      </div>
    </form>
  )
}

export default BudgetForm;