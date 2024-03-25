import "./Form.css";
import { useRef } from "react";
import { emailSend } from "../service/service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactForm() {
  let name = useRef(null);
  let email = useRef(null);
  let phone = useRef(null);
  let FormField = [
    {
      type: "text",
      placeholder: "Name",
      ref: name,
    },
    {
      type: "email",
      placeholder: "Email",
      ref: email,
    },
    {
      type: "tel",
      placeholder: "Mobile No.",
      ref: phone,
    },
  ];

  const formSubmit = async (event) => {
    event.preventDefault();

    let userData = {
      name: name.current.value,
      email: email.current.value,
      phone: phone.current.value,
    };

    for (let data in userData) {
      if (!userData?.[data]) {
        toast.error(`please fill ${data}`);
        return false;
      }
    }
    try {
      let result = await emailSend(userData);
      toast.success(`mail send successfuly`);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="flex justify-content-center width-per-100 align-item-center " style={{ paddingTop: "3%" }}>
      <div className="width-per-80 input box-shadow">
        <h3 className="font-size-8em ">Fill the Details </h3>
        <div
          className="flex justify-space-btw width-per-100"
          style={{
            border: " Mixed solid",
            borderImageSource: "linear-gradient(180deg,rgba(249, 164, 0, 0.75)  0%, rgba(0, 186, 255, 0.75) 100%)",
          }}
        >
          {/* section 1 */}

          <form action="#" method="post" className="width-per-100 flex flex-direction-column" style={{ gap: "1em" }}>
            {FormField.map((data) => (
              <div className=" width-per-100  ">
                <input
                  ref={data.ref}
                  type={data.type}
                  placeholder={data.placeholder}
                  className="width-per-100 input_focus  box-sizing box-border font-size-8em padding"
                />
              </div>
            ))}

            <button
              id="btn"
              onClick={formSubmit}
              style={{
                backgroundColor: "#00BAFF",
                padding: "8px 25px",
                fontSize: "1.15em",
                fontWeight: "500",
                borderRadius: "5px",
                color: "#FFFFFF",
                textAlign: "center",
                border: "0px ",
                width: "100%",
              }}
            >
              Submit
            </button>
          </form>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}
export default ContactForm;
