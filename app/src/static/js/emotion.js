function loadEmotions() {
    emojiApp = new Vue({
        el: '#emoji-app',
        data: {
            images: [
                {url: 'static/img/happy.png', alt: 'happy'},
                {url: 'static/img/excited.png', alt: 'excited'},
                {url: 'static/img/angry.png', alt: 'angry'},
                {url: 'static/img/distressed.png', alt: 'distressed'},
                {url: 'static/img/hungry.png', alt: 'hungry'},
                {url: 'static/img/confused.png', alt: 'confused'},
            ],
        }
    })
}
