import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom';
import css from './Header.module.scss'
import { gsap } from "gsap";

import { Menu } from './Menu';
import { Button } from './Button';

import { gsap_fouc, gsap_revealHeader, gsap_headerLinkHover } from './animations';
import SplitTextJS from 'split-text-js';



export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [splittedText, setSplittedText] = useState({})

  let headerRef = useRef(null)
  let headerLinkRef = useRef(null)
  let location = useLocation()

  const handleLinkEnter = ({ target }) =>
    gsap_headerLinkHover(splittedText, setSplittedText)

  const handleLinkLeave = ({ target }) =>
    gsap_headerLinkHover(splittedText, setSplittedText, true)

  useEffect(() => {
    // Avoid 'flash of unstyled content' (FOUC) 
    gsap_fouc(headerRef)
    // Reveal Menu from outside of page view
    gsap_revealHeader(headerRef)
    // Split header link text
    setSplittedText({
      timeline: [],
      target: new SplitTextJS(headerLinkRef),
    })
  }, [])

  // Hide menu when path changes
  useEffect(() =>
    setIsMenuOpen(false), [location])

  return (
    <header className={css.header} ref={el => headerRef = el}>
      <div className={css.headerContainer}>
        <Link className={css.headerLogo} to="/">snp</Link>
        <div className={css.headerSideContainer}>
          <Link className={css.headerLinkTest}
            to="/contact"
            ref={el => headerLinkRef = el}
            onMouseEnter={handleLinkEnter}
            onMouseLeave={handleLinkLeave}
          >Let's talk</Link>
          <Button isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>
      <Menu isMenuOpen={isMenuOpen} />
    </header>
  )
}
