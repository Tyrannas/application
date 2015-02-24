module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd/mm/yyyy") %> */\n'
            },
            build: {
                src: [
                    '../src/lib/createjs-2014.12.12.min.js',
                    '../src/lib/cocoon.min.js',
                    '../src/lib/xml-for-cocoonjs.js',
                    
                    // Main files 
                    '../src/functions.js',
                    '../src/var.js',
                    '../src/rooter.js',
                    '../src/main.js',
                    
                        // Intro 
                        '../src/intro/intro.js',
                        // Menu 
                        '../src/menu/menu.js',
                        // Salon 
                        '../src/recit/recit.js',
                        '../src/recit/line.js',
                        '../src/recit/menu.js',
                        '../src/recit/page.js',
                        '../src/recit/story.js',
                        '../src/recit/story_types/story_one_page.js',
                        // Labo 
                        '../src/labo/possibility.js',
                        '../src/labo/laboratory.js',
                        '../src/labo/cloud.js',
                        '../src/labo/recherche.js',
                        '../src/labo/menu.js',
                        // Editeur 
                        '../src/editeur/editeur.js',
                        '../src/editeur/editeur_classic.js',
                        '../src/editeur/editeur_multilignes.js',
                        '../src/editeur/recherche.js',
                        // Database
                        'res/db/local_db.js',
                        // StoriesDb 
                        'res/story/stories.js',
                        
                        // lib_separation 
                            // Logo 
                            '../src/lib_separation/logo/logo.js',
                            // Codes 
                            '../src/lib_separation/codes/codes.js',
                            // Word 
                            '../src/lib_separation/word/word.js',
                            '../src/lib_separation/word/constantes.js',
                            // Word_constructor 
                            '../src/lib_separation/word_constructor/coupable_haut.js',
                            '../src/lib_separation/word_constructor/coupable_bas.js',
                            '../src/lib_separation/word_constructor/coupable_entier.js',
                            '../src/lib_separation/word_constructor/centrale.js',
                            '../src/lib_separation/word_constructor/ombre.js',
                            '../src/lib_separation/word_constructor/spritesheets.js',
                            '../src/lib_separation/word_constructor/letter.js',
                            '../src/lib_separation/word_constructor/word_letters.js',
                            // Word_animation 
                            '../src/lib_separation/word_animation/animation.js',
                            '../src/lib_separation/word_animation/coupable_haut.js',
                            '../src/lib_separation/word_animation/coupable_bas.js',
                            '../src/lib_separation/word_animation/centrale.js',
                            '../src/lib_separation/word_animation/ombre.js',
                            '../src/lib_separation/word_animation/effects.js',
                            // Event 
                            '../src/lib_separation/event/event.js',
                            '../src/lib_separation/event/touchmove.js',
                            '../src/lib_separation/event/tap.js',
                            '../src/lib_separation/event/cut.js',
                            '../src/lib_separation/event/erase.js',
                            '../src/lib_separation/event/open.js',
                            '../src/lib_separation/event/sound.js',
                            '../src/lib_separation/event/word.js',
                            // Destroy 
                            '../src/lib_separation/destroy/destroy.js',
                            // XML 
                            '../src/lib_separation/xml/xml.js',
                            // Db 
                            '../src/lib_separation/db/db.js',
                            // Image 
                            '../src/lib_separation/image/image.js',
                            // GUI 
                            '../src/lib_separation/gui/gui.js',
                            // Json 
                            '../src/lib_separation/json/json.js',
                            // STorage 
                            '../src/lib_separation/storage/storage.js'
                ],
                dest: 'separation.min.js'
            }
        },
        nodewebkit: {
            options: {
                platforms: ['linux64'],
                buildDir: './', // Where the build version of my node-webkit app is saved
            },
            src: ['./**/**']
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.registerTask('default', ['uglify']);//,'nodewebkit']);
};