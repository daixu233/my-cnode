<template>
    <div>
        <nv-head page-type="主题"
                :show-menu="showMenu"
                :need-add="true"
                :fix-head="true">
        </nv-head>

        <div id="page"
                :class="{'show-menu':showMenu}"
                v-if="topic.title">

            <h2 class="topic-title" v-text="topic.title"></h2>
            <section class="author-info">
                <img class="avatar" :src="topic.author.avatar_url" />
                <div class="col">
                    <span>{{topic.author.loginname}}</span>
                    <time>
                        发布于:{{topic.create_at | getLastTimeStr(true)}}
                    </time>
                </div>
                <div class="right">
                    <span class="tag"
                            :class="getTabInfo(topic.tab, topic.good, topic.top, true)"
                            v-text="getTabInfo(topic.tab, topic.good, topic.top, false)">
                    </span>
                    <span class="name">{{topic.visit_count}}次浏览</span>
                </div>
            </section>

            <section class='markdown-body topic-content' v-html="topic.content">

            </section>

            <h3 class="topic-reply">
                <strong>{{topic.reply_count}}</strong> 回复
            </h3>

            <section class="reply-list">
                <ul>
                    <li v-for="(item, index) in topic.replies" :key="index">
                        <section class="user">
                            <router-link :to="{name:'user',params:{loginname:item.author.loginname}}" >
                                <img class="head" :src="item.author.avatar_url"/>
                            </router-link>
                            <div class="info">
                                <span class="cl">
                                    <span class="name" v-text="item.author.loginname"></span>
                                    <span class="name mt10">
                                        <span></span>
                                        发布于:{{item.create_at | getLastTimeStr(true)}}</span>
                                </span>
                                <span class="cr">
                                    <span class="iconfont icon">&#xe608;</span>
                                    {{item.ups.length}}
                                    <span class="iconfont icon">&#xe609;</span>
                                </span>
                            </div>
                        </section>
                        <div class="reply_content" v-html="item.content"></div>
                    </li>
                </ul>
            </section>
            <nv-top></nv-top>

        </div>

        <div class='no-data' v-if="noData">
            <i class="iconfont icon-empty">&#xe60a;</i>
            该话题不存在!
        </div>
    </div>
</template>
<script>
    import $ from 'webpack-zepto';
    import utils from '../libs/utils.js';
    import nvHead from '../components/header.vue';
    import nvTop from '../components/backtotop.vue';

    export default {
        data() {
            return {
                showMenu: false, // 是否展开左侧菜单
                topic: {}, // 主题
                noData: false,
                topicId: '',
                curReplyId: ''
            };
        },
        mounted() {
            // 隐藏左侧展开菜单
            this.showMenu = false;

            // 获取url传的tab参数
            this.topicId = this.$route.params.id;

            // 加载主题数据
            $.get('https://cnodejs.org/api/v1/topic/' + this.topicId, (d) => {
                if (d && d.data) {
                    this.topic = d.data;
                } else {
                    this.noData = true;
                }
            });
        },
        methods: {
            getTabInfo(tab, good = false, top, isClass) {
                return utils.getTabInfo(tab, good, top, isClass);
            },
            getLastTimeStr(time, ago) {
                return utils.getLastTimeStr(time, ago);
            },
            hideItemReply() {
                this.curReplyId = '';
            }
        },
        components: {
            nvHead,
            nvTop
        }
    };
</script>
