import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="text-center bg-brownie p-3 mt-5 fixed-bottom">
      <div className="socials mb-2">
        <a href="https://twitter.com/Mike_Rock1" className="mx-3">
          <FontAwesomeIcon
            icon={faTwitter}
            beat
            style={{ color: "#fff" }}
            size="xl"
          />
        </a>
        <a href="https://github.com/MikeRock51" className="mx-3">
          <FontAwesomeIcon
            icon={faGithub}
            flip
            size="xl"
            style={{ color: "#f5f5f5" }}
          />
        </a>
        <a href="https://www.instagram.com/mike_rock_musick/" className="mx-3">
          <FontAwesomeIcon
            icon={faInstagram}
            beatFade
            size="xl"
            style={{ color: "#fff" }}
          />
        </a>
        <a
          href="https://web.facebook.com/michael.adebayo.14268/"
          className="mx-3"
        >
          <FontAwesomeIcon
            icon={faFacebook}
            size="xl"
            bounce
            style={{ color: "#fff" }}
          />
        </a>
      </div>
      <footer className="p-1">
        <a
          className="link-underline link-underline-opacity-0 hover text-light"
          href="https://github.com/MikeRock51"
        >
          © Mike Rock {new Date().getFullYear()}
        </a>
      </footer>
    </div>
  );
}

export default Footer;
