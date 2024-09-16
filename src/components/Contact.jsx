import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import Message from "../utils/Message";
import "./contact.css";

function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [errors, setErrors] = useState({ name: "", tel: "" });
  const { sendMessage, loading } = Message();

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "name":
        if (!value) {
          error = t("MsgModal.validation.nameRequired");
        } else if (value.length < 3) {
          error = t("MsgModal.validation.nameMinLength");
        } else if (!isNaN(value)) {
          error = t("MsgModal.validation.nameNotNumber");
        }
        break;

      case "tel":
        if (!value) {
          error = t("MsgModal.validation.telRequired");
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
    return error === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNameValid = validateField("name", name);
    const isTelValid = validateField("tel", tel);

    if (isNameValid && isTelValid) {
      try {
        await sendMessage({ name, tel });
        toast.success(t("MsgModal.successMessage"));
        setName("");
        setTel("");
      } catch (err) {
        toast.error(t("MsgModal.errorMessage"));
      }
    }
  };

  return (
    <div id="contact">
      <div className="myContainer grid lg:grid-cols-2 lg:gap-8 gap-4">
        <div>
          <h2 className="heading2">{t("contact.heading")}</h2>
          <p className="lg:mt-6 mt-2 text">{t("contact.description")}</p>
        </div>
        <form className="flex flex-col lg:gap-4 gap-2" onSubmit={handleSubmit}>
          <div>
            <input
              id="name"
              type="text"
              placeholder={t("contact.namePlaceholder")}
              className="input text w-full"
              value={name}
              onBlur={() => validateField("name", name)}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-700 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <PhoneInput
              country={"uz"}
              value={tel}
              onChange={(phone) => setTel(phone)}
              inputProps={{ id: "tel", required: true }}
              containerStyle={{ width: "100%" }}
              inputStyle={{
                backgroundColor: "#f3f4f6",
                width: "100%",
                borderColor: "#f3f4f6",
              }}
              containerClass="inputContainer"
              inputClass="contactInput"
            />
            {errors.tel && <p className="text-red-700 text-sm">{errors.tel}</p>}
          </div>

          <textarea
            placeholder={t("contact.messagePlaceholder")}
            className="input text"
            rows="5"
            cols="33"
          />
          <div>
            <button
              className="bg-primary text-white py-4 w-full rounded-lg text lg:mb-0 mb-4"
              type="submit"
            >
              {loading
                ? t("contact.loadingSendButton")
                : t("contact.sendButton")}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Contact;
