function Contact(props) {
  return (
    <div id="contact">
      <div className="myContainer grid lg:grid-cols-2 lg:gap-8 gap-4">
        <div>
          <h2 className="heading2">Contact us</h2>
          <p className="lg:mt-6 mt-2 text">
            Leave your phone number and our managers will contact you soon
          </p>
        </div>
        <form className="flex flex-col lg:gap-4 gap-2">
          <input type="text" placeholder="Name" className="input text" />
          <input
            type="text"
            placeholder="Phone Number"
            className="input text"
          />
          <textarea
            placeholder="Your message"
            className="input text"
            rows="5"
            cols="33"
          />
          <div>
            <button className="bg-primary text-white py-4 w-full rounded-lg text lg:mb-0 mb-4">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
