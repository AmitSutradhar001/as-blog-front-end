import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitterX, BsGithub } from "react-icons/bs";
const FooterCom = () => {
  return (
    <div className="px-5">
      <Footer container className="border border-t-4  border-amber-200  py-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex w-full gap-3 justify-around">
            <div className="mt-8">
              <Link
                to={"/"}
                className="self-center whitespace-nowrap text-sm sm:text-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 px-5 py-2 w-32 text-center rounded-tl-lg rounded-br-lg"
              >
                AsBlog
              </Link>
            </div>
            <div className="grid grid-cols-2 py-2 px-1 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="About" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    30+ Projects
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Owner
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Social
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Personal" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Portfolio
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linkedin
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Privacy Policy" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms &amp; conditions
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="flex justify-around items-center">
            <Footer.Copyright
              className="mt-2"
              href="#"
              by=" AsBlog PV.LT"
              year={new Date().getFullYear()}
            />
            <div className=" flex mt-2 gap-3">
              <Footer.Icon href="#" target="_blank" icon={BsFacebook} />
              <Footer.Icon href="#" target="_blank" icon={BsInstagram} />
              <Footer.Icon href="#" target="_blank" icon={BsGithub} />
              <Footer.Icon href="#" target="_blank" icon={BsTwitterX} />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default FooterCom;
