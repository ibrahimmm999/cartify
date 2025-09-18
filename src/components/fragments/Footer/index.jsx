import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark-blue py-12 text-white">
      <div className="flex flex-col flex-wrap gap-8 md:gap-8 w-4/5 mx-auto ">
        <div className="block md:flex md:flex-wrap justify-between items-center">
          <div className=" w-1/4">
            <div className="flex gap-3 items-center mb-3">
              <img src="/logo.svg" alt="Logo" className="h-8" />
              <span>Cartify</span>
            </div>
            <span className="hidden md:block text-justify">
              Founded in 2002, we focus on delivering the best fashion driven
              products from world renowned brands to accelerate your style.
            </span>
          </div>
          <div className="text-sm lg:text-base flex flex-wrap w-full md:w-6/9 lg:w-4/9 gap-8 justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">About Us</p>
              <p>Careers</p>
              <p>T&C</p>
              <p>Contacts</p>
            </div>
            <div className="text-sm lg:text-base flex flex-col gap-2">
              <p className="font-semibold">Help</p>
              <p>FAQ</p>
              <p>Delivery</p>
              <p>Payments</p>
            </div>
            <div className="  flex flex-col gap-2">
              <p className="font-semibold">Social Media</p>
              <div className="flex gap-2 items-center">
                <Facebook size={16} />
                <p>Facebook</p>
              </div>
              <div className="flex gap-2 items-center">
                <Instagram size={16} />
                <p>Instagram</p>
              </div>
              <div className="flex gap-2 items-center">
                <Youtube size={16} />
                <p>Youtube</p>
              </div>
            </div>
          </div>
        </div>
        <p className="md:mt-10 lg:mt-0 text-sm lg:text-base">
          @Cartify 2002. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
