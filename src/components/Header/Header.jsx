import { useState } from 'react'

import css from './Header.module.scss'



/* Code */
function Header() {
    const [count, setCount] = useState(0)

    return (
        <header className={css.Header}>
            <h3 className={css.HeaderTitle}>Header</h3>
            <p onClick={() => setCount((count) => count + 1)}>
                State: {count}
            </p>
        </header>
    )
}

export default Header