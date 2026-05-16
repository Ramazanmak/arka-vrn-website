<script setup>

</script>

<template>
    <footer>
        <div class="footer-content">

          <div class="sector-wrapper">
            <h2 class="logo highlighted"> АРКА</h2>
            <p class="slogan">
              Производство бетонных изделий для благоустройства городских пространств
            </p>
          </div>

          <div class="sector-wrapper">
            <h2 class="contacts-header"> Контакты</h2>
            <a class="contact-way" href="tel:+79036514678">
              +7-903-651-46-78
            </a>
            <a class="contact-way" href="tel:+79003034943">
              +7-900-303-49-43
            </a>
            <a class="contact-way" href="tel:+79284245759">
              +7-928-424-57-59
            </a>
            <a class="contact-way" href="mailto:arka.zabor@yandex.ru"> arka.zabor@yandex.ru</a>
            <span class="contact-way" > Воронежская обл., Новая Усмань, ул. Дорожная, 1-А/1</span>
          </div>

          <div class="sector-wrapper">
            <h2 class="contacts-header"> Режим работы</h2>

            <span class="contact-way" > Пн.—Пт.: 08:00 — 17:00</span>
            <span class="contact-way" > Сб.—Вс.: Выходной</span>
          </div>
          
        </div>
        <div class="copyright-wrapper">
          <div class="copyright">
            АРКА © 2026 все права защищены
          </div>
          <div class="privacy">
            <p class="privacy__text">
              ИП Яшугин С.В. (arka-vrn.ru) 2020. Любое использование либо копирование материалов или подборки материалов сайта, элементов дизайна и оформления допускается с разрешения правообладателя и с указанием ссылки на источник arka-vrn.ru. Цены на товары и услуги, указанные на сайте, не являются публичной офертой.
            </p>
        </div>
      </div>
    </footer>

</template>

<style scoped>

footer {
  padding: 3em var(--side-padding);
  color: var(--global-700);
  font-size: 0.8em;
  border-top: 1px solid var(--contacts-bg-color);
  background-color: var(--global-500);
}

.footer-content {
  display:flex;
  flex-direction: column;
  padding-bottom: 2em;
  border-bottom: 1px solid var(--contacts-bg-color);
  gap: 2em;
  margin:0 auto 2em;
  max-width: 1500px;
}

.sector-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.4em;
}

.logo {
  font-size: 1.8em;
  margin: 0 0 .5rem;
}
.slogan {
  margin: 0;
}

.contacts-header {
  font-size: 1.3em;
  margin: 0 0 0.5em;
}

.contact-way{
  font-weight:500;
  color:var(--global-700);
  text-decoration: none;
  transition:var(--duration)
}
a.contact-way:hover{
  color:var(--second-main-color)
}

@media (min-width: 768px) {
  .footer-content {
    display: grid;
    grid-template-columns: 1fr 0.7fr 0.8fr;
    gap: 5em;
  }

  .copyright-wrapper {
    text-align: center;
    max-width: 1500px;
    margin: auto
  }
}
</style>