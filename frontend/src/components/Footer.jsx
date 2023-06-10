function Footer() {
    return (
        <div className="mt-auto text-center d-flex justify-content-center p-2 ">
            <footer className="p-1 w-25 bg-brownie rounded footer">
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
