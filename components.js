Vue.component('message', {
    props: ['title', 'body'],
    data() {
        return {
            isVisible: true
        }
    },
    template: `
    <article class="message" v-show="isVisible">
        <div class="message-header">
            {{ title }}
            <button type="button" @click="hideModal">X</button>
        </div>
        <div class="message-body">
            {{ body }}
        </div>
    </article>
            `,
    methods: {
        hideModal() {
            //this.isVisible === true ? this.isVisible = false : this.isVisible = true;
            this.isVisible = false;
        }
    }
});

Vue.component('task-list', {
    template: `
        <div>
            <task v-for="task in tasks" v-text="task.description"></task>
        </div>
    `,
    data() {
        return {
            tasks: [
                { description: 'Take out trash', completed: true },
                { description: 'Do the dishes', completed: true },
                { description: 'Fold laundry', completed: false },
                { description: 'Clear to do list', completed: false },
                { description: 'Walk dog', completed: true }
            ]
        }
    }
});
Vue.component('task', {
    template: '<li><slot></slot></li>'
});

Vue.component('modal', {
    template: `
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <slot></slot>
            </div>
        </div>
        <button @click="$emit('close')" class="modal-close is-large" aria-label="close"></button>
    </div>
`
});

Vue.component('tabs', {
    template: `
        <div>
            <div class="tabs">
                <ul>
                    <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                        <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
                    </li>
                </ul>
            </div>

            <div class="tabs-details">
                <slot></slot>
            </div>
        </div>
    `,
    data() {
        return { tabs: [] }
    },
    created() {
        this.tabs = this.$children;
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name === selectedTab.name);
            })
        }
    }
});
Vue.component('tab', {
    props: {
        name: { required: true },
        selected: { defaulted: false }
    },
    template: `<div v-show="isActive"><slot></slot></div>`,
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }
    },
    mounted() {
        this.isActive = this.selected;
    }
});

new Vue({
    el: '#root',
    data: {
        showModal: false
    }
})