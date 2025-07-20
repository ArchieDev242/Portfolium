import Link from "next/link"
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaTwitter } from "react-icons/fa"

// | socials |

const socials = [
    { icon: <FaGithub />, url: "https://github.com/ArchieDev242" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/maksym-k-1b633232a/" },
    { icon: <FaTwitter />, url: "https://x.com/ArchieDev242" },
    { icon: <FaDiscord />, url: "https://discordapp.com/users/593002022068944905" },
    { icon: <FaTelegram />, url: "https://t.me/Archie242" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/archiedev242?igsh=eW4zdGlreGJhdTR5" }
]

const Socials = ({ containerStyles, iconStyles }) => {
  return <div className = {containerStyles}>
    {socials.map((item, index) => {
      return <Link href = {item.url} key = {index} className = {iconStyles}>
        {item.icon}
      </Link>
    })}
  </div>
}

export default Socials