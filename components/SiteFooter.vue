<script setup lang="ts">
import { footerItems, phone, phoneLabel, ui } from '~/data/site'

const { lang } = useLang()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-main">
      <div>
        <LogoStub />
        <p>{{ ui[lang].footer.copy }}</p>
      </div>
      <div class="footer-contact">
        <a :href="`tel:${phone}`">{{ phoneLabel }}</a>
        <span>{{ ui[lang].footer.email }}</span>
        <div class="map-placeholder">{{ ui[lang].footer.map }}</div>
      </div>
    </div>
    <nav class="footer-links" aria-label="Footer">
      <NuxtLink v-for="item in footerItems" :key="item.to" :to="item.to">
        {{ ui[lang].nav[item.key as keyof typeof ui.bg.nav] }}
      </NuxtLink>
    </nav>
  </footer>
</template>
