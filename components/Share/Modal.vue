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
      display: block;
      align-items: center;
      width: 100%;
      outline: none;
      background: #FF0;
      color: #009;
      padding: 1rem;
      font-size: .75rem;
      resize: none;
      overflow: hidden;
      min-height: 3rem;
      word-break: break-all;
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
    margin-bottom: 1rem;
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
    }
  }
  .share_url_container.copied {
    &::after, &::before {
      display: flex;
    }
  }
  .modal_share_buttons {
    display: grid;
    width: 100%;
    grid-auto-flow: column;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: repeat(auto-fit, 3rem);
    grid-auto-flow: dense;
    justify-content: space-between;
    a {
      display: flex;
      width: 3rem;
      height: 3rem;
      align-items: center;
    }
  }
}
</style>
<template>
  <client-only>
    <b-modal
      id="modal_share"
      ref="modal_share"
      @shown="shown"
      static lazy centered hide-footer hide-header>
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
                <b-col ref="url" class="p-0 share_url_container" cols="12">
                  <textarea
                    ref="urlarea"
                    readonly="readonly"
                    rows="1"
                    @click="ev => {ev.target.select(); copyTextToClipboard(url)}"
                    >{{url}}</textarea>
                </b-col>
                <div class="modal_share_buttons">
                  <ShareNetwork
                    network="facebook"
                    :url="url"
                    :title="title"
                    :description="shortDescription"
                    :hashtags="hashtags"
                    :quote="quote"
                    >
                    <logo-facebook w="2rem" h="2rem"/>
                  </ShareNetwork>
                  <ShareNetwork
                    network="twitter"
                    :url="url"
                    :title="title"
                    :description="shortDescription"
                    :hashtags="hashtags"
                    :quote="quote"
                    >
                    <logo-twitter w="2rem" h="2rem"/>
                  </ShareNetwork>
                  <ShareNetwork
                    network="whatsapp"
                    :url="url"
                    :title="title"
                    :description="shortDescription"
                    :hashtags="hashtags"
                    :quote="quote"
                    >
                    <logo-whatsapp w="2rem" h="2rem"/>
                  </ShareNetwork>
                  <ShareNetwork
                    network="telegram"
                    :url="url"
                    :title="title"
                    :description="shortDescription"
                    :hashtags="hashtags"
                    :quote="quote"
                    >
                    <svg height="2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.74 22.14"><path d="M3.05361,9.59333l18.563-7.014a1.2,1.2,0,0,1,1.596,1.379l-3.2,14.602a1.37178,1.37178,0,0,1-2.143.818l-6.373-4.606a.85716.85716,0,0,1-.192-1.197,1.00268,1.00268,0,0,1,.1-.116l6.553-6.297a.34278.34278,0,0,0-.422-.536l-8.932,5.67a2.05623,2.05623,0,0,1-1.775.207l-3.752-1.298a.85729.85729,0,0,1-.023-1.612Z"></path></svg>
                  </ShareNetwork>
                  <ShareNetwork
                    network="sms"
                    :url="url"
                    :title="title"
                    :description="shortDescription"
                    :hashtags="hashtags"
                    :quote="quote"
                    >
                    <md-chatboxes-icon w="2rem" h="2rem"/>
                  </ShareNetwork>
                  <ShareNetwork
                    network="email"
                    :url="url"
                    :title="title"
                    :description="shortDescription"
                    :hashtags="hashtags"
                    :quote="quote"
                    >
                    <md-mail-icon w="2rem" h="2rem"/>
                  </ShareNetwork>
                </div>
              </b-row>
            </b-container>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </client-only>
</template>
<script>
import LogoFacebook from 'vue-ionicons/dist/logo-facebook.vue'
import LogoTwitter from 'vue-ionicons/dist/logo-twitter.vue'
import LogoWhatsapp from 'vue-ionicons/dist/logo-whatsapp.vue'
import LogoReddit from 'vue-ionicons/dist/logo-whatsapp.vue'
import MdChatboxesIcon from 'vue-ionicons/dist/md-chatboxes.vue'
import MdMailIcon from 'vue-ionicons/dist/md-mail.vue'
import {copyTextToClipboard} from '~/util'

function auto_grow(element) {
  element.style.height = "2rem";
  element.style.height = `${element.scrollHeight}px`;
}

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
    isShow() { return this.$refs.modal_share.isShow },
    shortDescription() {
      if (this.description && this.description.length > 160) {
        return this.description.slice(0, 159) + '…'
      }
      return this.description
    }
  },
  methods: {
    show() {
      this.$refs.modal_share.show()
    },
    shown() {
      this.auto_grow(this.$refs.urlarea)
      this.$refs.urlarea.focus()
    },
    copyTextToClipboard(text) {
      copyTextToClipboard(text, () => {
        this.textCopied()
      })
    },
    textCopied() {
      this.$refs.url.className += ' copied'
      setTimeout(() => this.$refs.url.className = this.$refs.url.className.slice(0, -7), 1500)
    },
    auto_grow
  }
}
</script>
