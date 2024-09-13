import { useNavigate } from "react-router-dom";

function News(props) {
  const navigate = useNavigate();

  const text1 = `Do you want to purchase professional equipment, but are not ready
              to part with the full amount? We have a solution for you! Find out
              about our convenient installment system, which allows you to
              purchase the necessary equipment right now and pay it off
              gradually. Visit the 'Installment' section to find out all the
              details and place your order today. Make your purchase even more
              affordable with Clemar!`;

  const text2 = `Find out about our special offers and discounts! Visit the
              'Promotions' section to be aware of all the profitable
              opportunities from Clemar. Save on purchases and receive
              additional bonuses. We are waiting for you on our social networks
              for even bigger surprises`;

  return (
    <div id="news">
      <div className="myContainer">
        <h2 className="heading2 lg:mb-8 mb-4">Our news</h2>
        <div className="grid lg:grid-cols-8 gap-8">
          {/* First Card */}
          <div className="bg-primary text-white lg:col-span-5 lg:py-8 py-4 lg:px-6 px-3 rounded-lg flex transition-transform transform hover:scale-105 shadow-md hover:shadow-lg">
            {/* Content */}
            <div className="lg:w-2/3 w-full flex-shrink-0 flex flex-col">
              <h5 className="heading5">Installment plan from Clemar</h5>
              <p className="my-3 text lg:hidden">
                {text1.substring(0, 300)} {" ..."}
              </p>
              <p className="my-6 text hidden lg:inline-block">{text1}</p>
              <div className="mt-auto">
                <button
                  className="lg:px-8 px-4 lg:py-3 py-2 lg:text-base text-sm bg-white text-primary hover:bg-white hover:text-primary transition-colors ease-in-out duration-300 shadow-sm hover:shadow-md active:scale-105 rounded-lg"
                  onClick={() => {
                    navigate(`/news/2`);
                    window.scroll(0, 0);
                  }}
                >
                  Read More
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="w-1/3 lg:flex justify-end items-center hidden">
              <img
                src="https://clemar.uz/static/media/discount.3f979949e7fdcee33844.png"
                alt="Discount Icon"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Second Card */}
          <div className="bg-blue-900 text-white lg:col-span-3 lg:py-8 py-4 lg:px-6 px-3 rounded-lg flex transition-transform transform hover:scale-105 shadow-md hover:shadow-lg">
            <div className="lg:w-2/3 w-full flex-shrink-0 flex flex-col">
              <h5 className="heading5">Promotions in Clemar</h5>
              <p className="my-3 text lg:hidden">
                {text2.substring(0, 300)} {" ..."}
              </p>
              <p className="my-6 text hidden lg:inline-block">{text2}</p>
              <div className="mt-auto">
                <button
                  className="lg:px-8 px-4 lg:py-3 py-2 lg:text-base text-sm bg-white text-primary transition-colors ease-in-out duration-300 shadow-sm hover:shadow-md active:scale-105 rounded-lg"
                  onClick={() => {
                    navigate(`/news/3`);
                    window.scroll(0, 0);
                  }}
                >
                  Read More
                </button>
              </div>
            </div>
            <div className="w-1/3 lg:flex justify-end items-center hidden">
              <img
                src="https://clemar.uz/static/media/deposit.ccf4bf8a4e0caf2da3d0.png"
                alt="Promotion Icon"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
