const asciidoctor = require('@asciidoctor/core')()
const asciidoctorRevealjs = require('@asciidoctor/reveal.js')
asciidoctorRevealjs.register()

const revealJsTargetDir = 'build/reveal.js'
const fse = require('fs-extra')
fse.copySync('node_modules/reveal.js', 'build/reveal.js', {filter: (src, dest) => {
    return (dest === revealJsTargetDir || dest.startsWith(`${revealJsTargetDir}/dist`) || dest.startsWith(`${revealJsTargetDir}/plugin`))
}})
fse.copySync('docs/images', 'build/images')
fse.copySync('docs/css', 'build/css')
const options = { safe: 'unsafe', backend: 'revealjs', base_dir: 'docs', to_dir: '../build', mkdirs: true, to_file: 'index.html', attributes: { revealjsdir: 'reveal.js' } }

asciidoctor.convertFile('docs/presentation.adoc', options)
