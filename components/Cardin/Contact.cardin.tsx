import { BsSpotify, MdEmail, AiOutlineGithub, FaInstagram, FaDiscord } from "../Misc/Icons.collection";

import { Icon } from "../Misc/Icon.component";

const Contact = () => {
  return (
    <div className="px-3 font-sen" id="contact">
      <p className="text-center text-3xl font-bold text-white">Get In Touch</p>

      <div className="my-8 flex flex-row justify-center gap-x-4">
        <Icon icon={<AiOutlineGithub />} url="/github" />
        <Icon icon={<FaDiscord />} url="https://discord.com/users/399703609685835778" />
        <Icon icon={<FaInstagram />} url="/instagram" />
        <Icon icon={<BsSpotify />} url="/spotify" />
        <Icon icon={<MdEmail />} url="mailto:Nekk.ng3@gmail.com" />
      </div>
    </div>
  );
};

export default Contact;
