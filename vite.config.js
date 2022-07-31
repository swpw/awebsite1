import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default ViteConfigInput => {
  const generateScopedName = ViteConfigInput.mode === 'production'
    ? '[hash:base64:2]'
    : '[local]_[hash:base64:2]'

    return defineConfig({
      plugins: [react()],
      css: {
        modules: {
          localConvention: 'camelCase',
          generateScopedName,
        }
      },
      base: './'
    })
}