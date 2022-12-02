import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom';
import css from './Header.module.scss'

import { Menu } from './Menu';
import { Button } from './Button';
import { isPageLoaded } from '../../context/Loader';

import { gsap_fouc, gsap_revealHeader, gsap_headerLinkHover, changeNavColor } from './animations';
import SplitTextJS from 'split-text-js';



export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState({
    state: false,
    clicked: false
  })
  const [splittedText, setSplittedText] = useState({})

  const pageLoaded = isPageLoaded();

  let headerRef = useRef(null)
  let headerLinkRef = useRef(null)
  let logoRef = useRef(null)
  let buttonRef = useRef(null)
  let location = useLocation()

  const handleLinkEnter = ({ target }) =>
    gsap_headerLinkHover(splittedText, setSplittedText)

  const handleLinkLeave = ({ target }) =>
    gsap_headerLinkHover(splittedText, setSplittedText, true)

  // load event finished
  useEffect(() => {
    if (!pageLoaded) return
    // Avoid 'flash of unstyled content' (FOUC) 
    gsap_fouc(headerRef.current)
    // Reveal Menu from outside of page view
    gsap_revealHeader(headerRef.current)
    // Split header link text
    setSplittedText({
      timeline: [],
      target: new SplitTextJS(headerLinkRef),
    })
  }, [pageLoaded])

  // Hide menu when path changes
  useEffect(() =>
    setIsMenuOpen(prev => ({ ...prev, state: false })), [location])

  // Change nav color when open
  useEffect(() => {
    isMenuOpen.clicked &&
      changeNavColor({
        state: isMenuOpen.state,
        logo: logoRef,
        link: headerLinkRef,
        button: buttonRef.current,
      })
  }, [isMenuOpen])

  return (
    <header className={css.header} ref={headerRef}>
      <div className={css.headerContainer}>
        <span className={css.overflowHide}>
          <Link className={css.headerLogo} to="/" ref={el => logoRef = el}>Digital Agency</Link>
        </span>
        <div className={css.headerSideContainer}>
          <span className={css.overflowHide}>
            <Link className={css.headerLinkTest}
              to="/contact"
              ref={el => headerLinkRef = el}
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
            >Let's talk</Link>
          </span>
          <Button ref={buttonRef} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>
      <Menu headerRef={headerRef} isMenuOpen={isMenuOpen} />
    </header>
  )
}
