// Обработчик подключения WebRTC
document.getElementById('connectBtn').addEventListener('click', () => {
    alert('Попытка подключения через WebRTC...');
    // Реализация WebRTC требует сложной сигнализации и сервера
});

// Управление наушниками
let isMuted = false;
document.getElementById('muteBtn').addEventListener('click', () => {
    isMuted = !isMuted;
    document.getElementById('muteBtn').textContent = isMuted ? 'Включить наушники' : 'Выключить наушники';
});

// Управление микрофоном
let micActive = false;
document.getElementById('micToggle').addEventListener('click', async () => {
    if (!micActive) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            micActive = true;
            document.getElementById('micStatus').textContent = 'Микрофон: Включен';
            document.getElementById('micProgress').value = 1;
            document.getElementById('micToggle').disabled = true; // Только включение
        } catch (err) {
            alert('Разрешение на доступ к микрофону отклонено');
        }
    }
});
