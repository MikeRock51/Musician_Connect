function Footer() {
    return (
        <div className="mt-auto text-center bg-brownie p-2 pb-0 fixed-bottom">
            <footer className="p-1 footer">
                <a
                    className="link-underline link-underline-opacity-0 hover bright"
                    href="https://github.com/MikeRock51">
                    © Mike Rock {new Date().getFullYear()}
                </a>
            </footer>
        </div>
    )
}

export default Footer;
