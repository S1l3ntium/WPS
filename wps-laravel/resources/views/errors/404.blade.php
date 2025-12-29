<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Страница не найдена</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1f4d 0%, #2c3570 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
        }

        .error-container {
            text-align: center;
            padding: 2rem;
            max-width: 500px;
        }

        .error-code {
            font-size: 5rem;
            font-weight: bold;
            color: #4db8b8;
            margin-bottom: 1rem;
        }

        .error-title {
            font-size: 1.75rem;
            margin-bottom: 1rem;
        }

        .error-message {
            font-size: 1rem;
            opacity: 0.9;
            margin-bottom: 2rem;
            line-height: 1.6;
        }

        .back-link {
            display: inline-block;
            background: #4db8b8;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            text-decoration: none;
            transition: background 0.3s ease;
            font-weight: 500;
        }

        .back-link:hover {
            background: #3da8a8;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-code">404</div>
        <h1 class="error-title">Страница не найдена</h1>
        <p class="error-message">
            К сожалению, запрашиваемая страница не существует или была удалена.
        </p>
        <a href="/" class="back-link">На главную</a>
    </div>
</body>
</html>
