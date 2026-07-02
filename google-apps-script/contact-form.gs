/**
 * Google Apps Script Web App — принимает заявки с сайта и дописывает строку
 * в таблицу "Мами сайт" (лист "Лист1", колонки: дата, имя, телефон, почта, комментарий).
 *
 * Установка:
 * 1. В Google Таблице: Расширения → Apps Script.
 * 2. Вставить этот код в Code.gs (замените содержимое целиком) и сохранить (Ctrl/Cmd+S).
 * 3. Project Settings (шестерёнка слева) → Script Properties → добавить свойство
 *    CONTACT_FORM_SECRET со случайной строкой (тот же секрет указать в Vercel
 *    как GOOGLE_APPS_SCRIPT_SECRET).
 * 4. ВАЖНО: перед деплоем один раз вручную запустите функцию testAppendRow —
 *    выберите её в выпадающем списке функций рядом с кнопкой "Run" и нажмите Run.
 *    Google покажет запрос на разрешения (Review permissions → Advanced →
 *    Go to project → Allow) — это единственный способ выдать скрипту доступ
 *    к таблице. Без этого шага анонимные запросы от сайта будут молча падать.
 * 5. Deploy → New deployment → Type: Web app.
 *    Execute as: Me. Who has access: Anyone.
 * 6. Скопировать выданный URL (заканчивается на /exec) — это GOOGLE_APPS_SCRIPT_URL.
 *
 * КАЖДЫЙ РАЗ, когда меняете код после того как деплой уже создан — код в
 * редакторе сам по себе НЕ обновляет рабочий /exec URL. Нужно:
 * Deploy → Manage deployments → карандаш у деплоя → Version: New version → Deploy.
 * Иначе сайт продолжит стучаться в старую версию кода.
 *
 * Если после этого сайт всё равно не пишет в таблицу — откройте слева иконку
 * "Executions" (часы) и посмотрите, что происходит при реальном вызове с сайта.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents)

    var expectedSecret = PropertiesService.getScriptProperties().getProperty('CONTACT_FORM_SECRET')
    if (expectedSecret && data.secret !== expectedSecret) {
      return jsonResponse({ status: 'error', message: 'unauthorized' })
    }

    var name = String(data.name || '').trim()
    var phone = String(data.phone || '').trim()
    var email = String(data.email || '').trim()
    var message = String(data.message || '').trim()

    if (!name || !phone || !email) {
      return jsonResponse({ status: 'error', message: 'missing_fields' })
    }

    appendContactRow(name, phone, email, message)

    return jsonResponse({ status: 'ok' })
  } catch (error) {
    return jsonResponse({ status: 'error', message: String(error) })
  }
}

function appendContactRow(name, phone, email, message) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Лист1')
  // Ведущий апостроф заставляет Таблицы хранить телефон как текст, а не как
  // формулу/число — иначе "+7 900..." превращается в #ERROR!.
  sheet.appendRow([new Date(), name, "'" + phone, email, message])
}

// Apps Script веб-приложения всегда отвечают HTTP 200 — статус успеха/ошибки
// определяется полем "status" в теле JSON-ответа, а не HTTP-кодом.
function jsonResponse(body) {
  var output = ContentService.createTextOutput(JSON.stringify(body))
  output.setMimeType(ContentService.MimeType.JSON)
  return output
}

// Запустите эту функцию вручную один раз из редактора (кнопка Run), чтобы
// пройти запрос разрешений на доступ к таблице до первого реального запроса с сайта.
function testAppendRow() {
  appendContactRow('Тестовая запись', '+7 900 000-00-00', 'test@example.com', 'Проверка доступа скрипта к таблице')
}
