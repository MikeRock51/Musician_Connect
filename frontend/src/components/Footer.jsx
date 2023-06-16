import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="text-center bg-brownie p-2 pb-0 mt-5">
      <div className="socials">
        <a href="" className="mx-3">
          <FontAwesomeIcon
            icon={faTwitter}
            beat
            style={{ color: "#fff" }}
            size="xl"
          />
        </a>
        <a href="" className="mx-3">
          <FontAwesomeIcon
            icon={faGithub}
            flip
            size="xl"
            style={{ color: "#f5f5f5" }}
          />
        </a>
        <a href="" className="mx-3">
          <FontAwesomeIcon
            icon={faInstagram}
            beatFade
            size="xl"
            style={{ color: "#fff" }}
          />
        </a>
        <a href="" className="mx-3">
          <FontAwesomeIcon
            icon={faFacebook}
            size="xl"
            bounce
            style={{ color: "#fff" }}
          />
        </a>
      </div>
      <footer className="p-1 footer">
        <a
          className="link-underline link-underline-opacity-0 hover bright"
          href="https://github.com/MikeRock51"
        >
          © Mike Rock {new Date().getFullYear()}
        </a>
      </footer>
    </div>
  );
}

export default Footer;
