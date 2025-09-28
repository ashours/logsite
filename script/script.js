        function loadContent(button) {
            const mainFrame = document.getElementById('main-frame');
            const imagePath = button.getAttribute('data-src');

            mainFrame.classList.add('loading-state');

            // הסרה מהירה יותר של הקלאס active מכל הכפתורים
            document.querySelectorAll('aside button').forEach(btn => {
                btn.classList.remove('active');
                btn.style.transition = 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            // הוספת קלאס active לכפתור שנלחץ
            button.classList.add('active');

            // הצגת מסך טעינה
            mainFrame.innerHTML = '<div class="loading">טוען את הנתונים...</div>';

            // השהייה קצרה יותר לטעינה
            setTimeout(() => {
                mainFrame.classList.remove('loading-state');
                mainFrame.innerHTML = `
                    <img src="${imagePath}" 
                         class="content-image" 
                         alt="תמונת תוכן"
                         onerror="handleImageError(this, '${imagePath}')"
                         onload="handleImageLoad(this)">
                `;
                
                // החזרת מהירות המעבר הרגילה לכפתורים אחרי זמן קצר
                setTimeout(() => {
                    document.querySelectorAll('aside button').forEach(btn => {
                        btn.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
                    });
                }, 200);
            }, 700);
        }

        function handleImageLoad(img) {
            console.log('תמונה נטענה בהצלחה: ' + img.src);
            if (img.classList.contains('content-image')) {
                img.classList.add('entering');
                setTimeout(() => {
                    img.classList.add('loaded');
                }, 50);
            }
        }

        function handleImageError(img, imagePath) {
            img.parentElement.innerHTML = `
                <div class="error-content">
                    שגיאה בטעינת התמונה:<br>
                    <span style="font-size: 0.9em; opacity: 0.8;">${imagePath}</span>
                </div>
            `;
        }

        function handleInitialImageError(img) {
            img.parentElement.innerHTML = `
                <div class="error-content">
                    שגיאה בטעינת תמונת הפתיחה<br><br>
                    בחרו דף מהתפריט הצדי
                </div>
            `;
        }

        function goHome() {
            const mainFrame = document.getElementById('main-frame');

            mainFrame.style.opacity = '0.6';
            mainFrame.style.transform = 'scale(0.98)';

            setTimeout(() => {
                document.querySelectorAll('aside button').forEach(btn => {
                    btn.classList.remove('active');
                });

                mainFrame.innerHTML = `
            <img src="baseimage/startpage.png" class="initial-image" alt="תמונת פתיחה" 
  	   onerror="handleInitialImageError(this)" onload="handleImageLoad(this)">      `;
                mainFrame.style.opacity = '1';
                mainFrame.style.transform = 'scale(1)';
            }, 150);
        }

        // אפקטי hover דינאמיים
        document.addEventListener('DOMContentLoaded', function () {
            const header = document.querySelector('header');
            header.addEventListener('mousemove', function (e) {
                const rect = header.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                header.style.setProperty('--mouse-x', x + '%');
                header.style.setProperty('--mouse-y', y + '%');
            });

            header.addEventListener('mouseleave', function () {
                header.style.background = 'black';
            });
        });
