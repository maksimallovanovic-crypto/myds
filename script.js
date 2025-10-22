// Хранение соединений
const connections = {};

// Обработчики голосовых комнат
document.getElementById('voice1').addEventListener('click', () => connectToRoom('voice1'));
document.getElementById('voice2').addEventListener('click', () => connectToRoom('voice2'));
document.getElementById('voice3').addEventListener('click', () => connectToRoom('voice3'));

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

// Функция подключения к комнате
function connectToRoom(roomId) {
    // Создаем новое соединение
    connections[roomId] = new RTCPeerConnection();
    
    // Добавляем локальный поток (если есть)
    if (micActive) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                stream.getAudioTracks().forEach(track => connections[roomId].addTrack(track, stream));
            });
    }
    
    // Пример создания offer (в реальном случае нужен сервер сигнализации)
    connections[roomId].createOffer()
        .then(offer => connections[roomId].setLocalDescription(offer))
        .then(() => {
            alert(`Подключение к ${roomId} установлено`);
            // Здесь должен быть обмен SDP с удаленным участником
        })
        .catch(err => console.error('Ошибка подключения:', err));
}
