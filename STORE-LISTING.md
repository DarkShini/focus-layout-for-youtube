# Focus Layout for YouTube — Store listing / Карточка

Name / Название: Focus Layout for YouTube.

Version / Версия: 0.6.4.

Primary store / Основной магазин: Opera Add-ons.

Primary listing language / Основной язык карточки: Russian / Русский. Интерфейс настроек в этой версии на русском языке; английский текст ниже — дополнительное описание.

## English

Summary:

Center your YouTube watch layout, choose what fits on the first screen, and arrange comments, recommendations and playlists.

Description:

Arrange the YouTube watch page around the video. This extension works in desktop YouTube Theater mode: press T in the player to enable that mode, then open the extension popup to choose your layout.

Features:

- Keep the video at the top and center its title.
- Choose whether the first screen includes only the video and title, or also the channel and action buttons.
- Show or hide the YouTube masthead. Its visible height is included when calculating the video area.
- Center the channel and description section independently of the lower columns.
- Put comments on either side of recommendations.
- Place the playlist above recommendations or beside the description on wide windows.
- Show the native playlist as a horizontal strip below the description, with automatic reveal of the current video.
- Keep YouTube's native video width and use responsive single-column fallback on narrow windows.
- Adjust spacing above the video, spacing around the title and title font size; the first-screen video height updates automatically. Changes apply when the slider is released.

Settings stay in local browser extension storage. There is no analytics, advertising or developer-operated server, and the extension does not send data to the developer. Permission to run on www.youtube.com is used only to adjust the watch-page layout, including navigation from the home page without a full reload.

The layout is applied only in Theater mode. Standard watch mode, Shorts, embedded players and the mobile YouTube site are outside its scope. Live chat layouts have not been validated. YouTube interface updates may require compatibility updates.

This is an independent extension and is not affiliated with or endorsed by YouTube or Google.

## Русский

Краткое описание:

Настройте страницу просмотра YouTube: первый экран, центрирование блоков, комментарии, рекомендации и положение плейлиста.

Полное описание:

Расширение перестраивает страницу просмотра YouTube вокруг видео. Оно работает в настольном режиме «Широкий экран»: включите его клавишей T в плеере, затем откройте настройки расширения.

Возможности:

- Видео сверху и название по центру.
- Два варианта первого экрана: только видео с названием либо видео, название, канал и кнопки.
- Скрытие или показ верхней панели YouTube с учётом её высоты в размере видео.
- Центрирование блока канала и описания независимо от нижних колонок.
- Перестановка комментариев и рекомендаций.
- Плейлист над рекомендациями или рядом с описанием в широком окне.
- Горизонтальная лента штатного плейлиста под описанием, с переходом к текущему ролику.
- Штатная ширина видео и адаптация к узким окнам.
- Отступ над видео, отступы названия и размер его шрифта: ползунки автоматически учитываются в высоте первого экрана. Изменения применяются после отпускания.

Настройки сохраняются локально в браузере. В расширении нет аналитики, рекламы и серверной части; данные разработчику не отправляются. Доступ к www.youtube.com нужен для изменения layout, в том числе при переходе с главной страницы в ролик без перезагрузки.

Layout применяется только в широком режиме. Обычный режим, Shorts, встроенные плееры и мобильный сайт не входят в область работы расширения. Расположение трансляций с чатом не проверялось. Обновления интерфейса YouTube могут потребовать обновления расширения.

Это независимое расширение, не связанное с YouTube или Google и не одобренное ими.

## Notes for store review

Single purpose: rearrange the desktop YouTube watch page in Theater mode.

Permission justification: `storage` persists only layout preferences locally. Matching `https://www.youtube.com/*` is required for single-page navigation from non-watch pages; CSS selectors limit actual layout changes to the active Theater-mode watch page.

Remote code: none. No remote dependencies or extra network requests are made by the extension.

Category suggestion: Appearance for Opera; a suitable appearance/productivity category in the current Chrome dashboard.

Do not claim a measured performance gain: time-to-first-frame impact has not been measured in the target browsers.
