import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom';
import css from './Header.module.scss'

import { Menu } from './Menu';
import { Button } from './Button';

import { gsap_fouc, gsap_revealHeader } from './animations';



export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  let headerRef = useRef(null)
  let location = useLocation()

  useEffect(() => {
    // Avoide 'flash of unstyled content' (FOUC) 
    gsap_fouc(headerRef)
    // Reveal Menu from outside of page view
    gsap_revealHeader(headerRef)
  }, [])

  // Hide menu when path changes
  useEffect(() =>
    setIsMenuOpen(false), [location])

  return (
    <header className={css.header} ref={el => headerRef = el}>
      <div className={css.headerContainer}>
        <Link className={css.headerLogo} to="/">snp</Link>
        <Button isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
      <Menu isMenuOpen={isMenuOpen} />
    </header>
  )
}
