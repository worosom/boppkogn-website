<style lang="scss">
#modal_share {
  .modal-content {
    background: #009;
    border-radius: 0px;
    border: 1rem solid #FF0;
    .modal-body {
      font-family: "Sporting Grotesque_Bold";
    }
    h1 {
      color: #FF0;
    }
    a {
      color: #FF0;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: #FF0;
        color: #F00;
        svg {
          fill: #F00;
        }
      }
    }
    textarea {
      outline: none;
      background: #FF0;
      color: #009;
      padding: 1rem;
      &::selection {
        background: #009;
        color: #FF0;
        backdrop-filter: invert(1);
      }
    }
    .col {
      text-align: center;
    }
    svg {
      fill: #FF0;
    }
  }
  .share_url_container {
    position: relative;
    &::after, &::before {
      display: none;
    }
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #3A5;
      content: '';
    }
    &::after {
      position: absolute;
      top: .125rem;
      left: 0;
      width: 100%;
      height: 100%;
      color: #FFF;
      font-family: 'Sporting Grotesque_Bold';
      content: 'Link copied to clipboard!';
      align-items: center;
      justify-content: center;
      text-align: center;
      white-space: nowrap;
    }
  }
  .share_url_container.copied {
    &::after, &::before {
      display: flex;
    }
  }
}
</style>
<template>
  <b-modal
    id="modal_share"
    ref="modal_share"
    lazy centered hide-footer hide-header>
    <b-container>
      <b-row>
        <b-col
          class="p-0 modal_share"
          >
          <b-container>
            <b-row>
              <b-col>
                <h1>Share it</h1>
              </b-col>
              <b-col ref="url" class="p-0 mb-4 share_url_container" cols="12">
                <textarea
                readonly="readonly"
                type="text"
                style="width: 100%"
                @click="ev => {ev.target.select(); copyTextToClipboard(url)}"
                >{{url}}</textarea>
              </b-col>
              <b-col class="mb-3">
                <ShareNetwork
                  network="facebook"
                  :url="url"
                  :title="title"
                  :description="description"
                  :hashtags="hashtags"
                  :quote="quote"
                  >
                  <logo-facebook w="2rem" h="2rem"/>
                </ShareNetwork>
              </b-col>
              <b-col class="mb-3">
                <ShareNetwork
                  network="twitter"
                  :url="url"
                  :title="title"
                  :description="description"
                  :hashtags="hashtags"
                  :quote="quote"
                  >
                  <logo-twitter w="2rem" h="2rem"/>
                </ShareNetwork>
              </b-col>
              <b-col class="mb-3">
                <ShareNetwork
                  network="whatsapp"
                  :url="url"
                  :title="title"
                  :description="description"
                  :hashtags="hashtags"
                  :quote="quote"
                  >
                  <logo-whatsapp w="2rem" h="2rem"/>
                </ShareNetwork>
              </b-col>
              <b-col class="mb-3">
                <ShareNetwork
                  network="telegram"
                  :url="url"
                  :title="title"
                  :description="description"
                  :hashtags="hashtags"
                  :quote="quote"
                  >
                  <svg height="2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.74 22.14"><path d="M3.05361,9.59333l18.563-7.014a1.2,1.2,0,0,1,1.596,1.379l-3.2,14.602a1.37178,1.37178,0,0,1-2.143.818l-6.373-4.606a.85716.85716,0,0,1-.192-1.197,1.00268,1.00268,0,0,1,.1-.116l6.553-6.297a.34278.34278,0,0,0-.422-.536l-8.932,5.67a2.05623,2.05623,0,0,1-1.775.207l-3.752-1.298a.85729.85729,0,0,1-.023-1.612Z"></path></svg>
                </ShareNetwork>
              </b-col>
              <b-col class="mb-3">
                <ShareNetwork
                  network="sms"
                  :url="url"
                  :title="title"
                  :description="description"
                  :hashtags="hashtags"
                  :quote="quote"
                  >
                  <md-chatboxes-icon w="2rem" h="2rem"/>
                </ShareNetwork>
              </b-col>
              <b-col class="mb-3">
                <ShareNetwork
                  network="email"
                  :url="url"
                  :title="title"
                  :description="description"
                  :hashtags="hashtags"
                  :quote="quote"
                  >
                  <md-mail-icon w="2rem" h="2rem"/>
                </ShareNetwork>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
import LogoFacebook from 'vue-ionicons/dist/logo-facebook.vue'
import LogoTwitter from 'vue-ionicons/dist/logo-twitter.vue'
import LogoWhatsapp from 'vue-ionicons/dist/logo-whatsapp.vue'
import LogoReddit from 'vue-ionicons/dist/logo-whatsapp.vue'
import MdChatboxesIcon from 'vue-ionicons/dist/md-chatboxes.vue'
import MdMailIcon from 'vue-ionicons/dist/md-mail.vue'
import {copyTextToClipboard} from '~/util'

export default {
  components: {LogoFacebook, LogoTwitter, LogoWhatsapp, MdChatboxesIcon, MdMailIcon},
  props: {
    'url': {
      type: String,
      default: process.env.BASE_URL
    },
    'title': {
      type: String,
      default: '🎤Hip Hop Festival Bopp Kogn'
    },
    'description': {
      type: String
    },
    'quote': { type: String },
    'hashtags': { type: String, default: 'boppkognfestival,boppkogn' },
    'twitter-user': { type: String },
    'media': { type: String }
  },
  computed: {
    isShow() { return this.$refs.modal_share.isShow }
  },
  methods: {
    show() {this.$refs.modal_share.show()},
    copyTextToClipboard(text) {
      copyTextToClipboard(text, () => {
        this.textCopied()
      })
    },
    textCopied() {
      this.$refs.url.className += ' copied'
      setTimeout(() => this.$refs.url.className = this.$refs.url.className.slice(0, -7), 1500)
    }
  }
}
</script>
