        const suppliers = [
            {
                id: 'herramientas',
                name: 'Herrería Martínez',
                lastMessage: 'Tenemos los tornillos que necesitas',
                time: '10:30 AM',
                online: true,
                messages: [
                    { sender: 'provider', text: '¡Buen día! ¿En qué podemos ayudarle hoy?', time: '10:00 AM', type: 'text' },
                    { sender: 'provider', text: 'Tenemos promoción en herramientas esta semana', time: '10:05 AM', type: 'text' },
                    { sender: 'user', text: 'Hola, necesito cotizar tornillos de 1/2"', time: '10:15 AM', type: 'text' },
                    { sender: 'provider', text: 'Tenemos en stock. Precio por caja de 100: $75.00', time: '10:30 AM', type: 'text' }
                ]
            },
            {
                id: 'electricidad',
                name: 'Eléctrica Ramos',
                lastMessage: 'Los cables llegaron hoy',
                time: 'Ayer',
                online: false,
                messages: [
                    { sender: 'provider', text: 'Buen día, los cables que pidió ya llegaron', time: '9:00 AM', type: 'text' },
                    { sender: 'user', text: 'Excelente, ¿pueden enviarlos hoy?', time: '9:30 AM', type: 'text' },
                    { sender: 'provider', text: 'Sí, haremos el envío antes de las 3pm', time: '9:45 AM', type: 'text' }
                ]
            },
            {
                id: 'pinturas',
                name: 'Pinturas y Más',
                lastMessage: 'Nuevos colores disponibles',
                time: 'Lunes',
                online: true,
                messages: [
                    { sender: 'provider', text: 'Tenemos nuevos colores en pintura ecológica', time: '11:00 AM', type: 'text' },
                    { sender: 'provider', text: 'Adjunto nuestro catálogo actualizado', time: '11:05 AM', type: 'image', content: 'catalogo.jpg' },
                    { sender: 'user', text: 'Gracias, lo revisaré', time: '2:30 PM', type: 'text' }
                ]
            },
            {
                id: 'construccion',
                name: 'Materiales Construcción',
                lastMessage: 'Confirmado el envío de cemento',
                time: 'Viernes',
                online: false,
                messages: [
                    { sender: 'user', text: 'Necesito 50 sacos de cemento para lunes', time: '3:00 PM', type: 'text' },
                    { sender: 'provider', text: 'Confirmado, haremos el envío el lunes por la mañana', time: '3:30 PM', type: 'text' },
                    { sender: 'user', text: 'Perfecto, gracias', time: '3:35 PM', type: 'text' }
                ]
            }
        ];

        let currentSupplier = null;
        let audioRecorder = null;
        let audioChunks = [];
        
        const chatListEl = document.getElementById('chat-list');
        const messagesContainerEl = document.getElementById('messages-container');
        const messageInputEl = document.getElementById('message-input');
        const sendBtnEl = document.getElementById('send-btn');
        const attachBtnEl = document.getElementById('attach-btn');
        const attachmentModalEl = document.getElementById('attachment-modal');
        const closeModalEl = document.getElementById('close-modal');
        const attachImageEl = document.getElementById('attach-image');
        const attachAudioEl = document.getElementById('attach-audio');
        const attachFileEl = document.getElementById('attach-file');
        const fileInputEl = document.getElementById('file-input');
        
        function init() {
            renderSupplierList();
            setupEventListeners();
        }
        
        function renderSupplierList() {
            chatListEl.innerHTML = '';
            
            suppliers.forEach(supplier => {
                const supplierEl = document.createElement('div');
                supplierEl.className = 'chat-item';
                supplierEl.innerHTML = `
                    <div class="chat-avatar">${supplier.name.charAt(0)}</div>
                    <div class="chat-info">
                        <div class="chat-name">${supplier.name}</div>
                        <div class="chat-last-msg">${supplier.lastMessage}</div>
                    </div>
                    <div class="chat-time">${supplier.time}</div>
                `;
                
                supplierEl.addEventListener('click', () => {
                    selectSupplier(supplier);
                });
                
                chatListEl.appendChild(supplierEl);
            });
        }
        
        function selectSupplier(supplier) {
            currentSupplier = supplier;
            updateChatHeader(supplier);
            renderMessages(supplier.messages);
            
            document.querySelectorAll('.chat-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const items = document.querySelectorAll('.chat-item');
            for (let i = 0; i < suppliers.length; i++) {
                if (suppliers[i].id === supplier.id) {
                    items[i].classList.add('active');
                    break;
                }
            }
        }
        
        function updateChatHeader(supplier) {
            const chatHeaderEl = document.getElementById('chat-header');
            const avatarEl = chatHeaderEl.querySelector('.chat-avatar');
            const nameEl = chatHeaderEl.querySelector('.chat-header-name');
            const statusEl = chatHeaderEl.querySelector('.chat-header-status');
            
            avatarEl.textContent = supplier.name.charAt(0);
            nameEl.textContent = supplier.name;
            statusEl.textContent = supplier.online ? 'En línea' : 'Desconectado';
        }
        
        function renderMessages(messages) {
            messagesContainerEl.innerHTML = '';
            
            if (messages.length === 0) {
                messagesContainerEl.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-comment-dots"></i>
                        <h3>No hay mensajes aún</h3>
                        <p>Inicia la conversación con ${currentSupplier.name}</p>
                    </div>
                `;
                return;
            }
            
            messages.forEach(message => {
                const messageEl = document.createElement('div');
                messageEl.className = `message ${message.sender === 'user' ? 'sent' : 'received'}`;
                
                let contentHtml = '';
                
                if (message.type === 'text') {
                    contentHtml = message.text;
                } else if (message.type === 'image') {
                    contentHtml = `
                        <div>${message.text || ''}</div>
                        <img src="${message.content}" alt="Imagen enviada">
                    `;
                } else if (message.type === 'audio') {
                    contentHtml = `
                        <div>${message.text || ''}</div>
                        <div class="audio-message">
                            <i class="fas fa-volume-up audio-icon"></i>
                            <audio controls src="${message.content}"></audio>
                        </div>
                    `;
                }
                
                messageEl.innerHTML = `
                    <div class="message-content">${contentHtml}</div>
                    <div class="message-time">
                        ${message.time}
                        ${message.sender === 'user' ? '<i class="fas fa-check-double"></i>' : ''}
                    </div>
                `;
                
                messagesContainerEl.appendChild(messageEl);
            });
            
            messagesContainerEl.scrollTop = messagesContainerEl.scrollHeight;
        }
        
        function setupEventListeners() {
            messageInputEl.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            sendBtnEl.addEventListener('click', sendMessage);
            
            attachBtnEl.addEventListener('click', () => {
                attachmentModalEl.style.display = 'flex';
            });
            
            closeModalEl.addEventListener('click', () => {
                attachmentModalEl.style.display = 'none';
            });
            
            attachImageEl.addEventListener('click', () => {
                fileInputEl.accept = 'image/*';
                fileInputEl.click();
            });
            
            attachAudioEl.addEventListener('click', () => {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    startAudioRecording();
                } else {
                    fileInputEl.accept = 'audio/*';
                    fileInputEl.click();
                }
            });
            
            attachFileEl.addEventListener('click', () => {
                fileInputEl.accept = '.pdf,.doc,.docx,.xls,.xlsx';
                fileInputEl.click();
            });
            
            fileInputEl.addEventListener('change', handleFileSelect);
                        attachmentModalEl.addEventListener('click', (e) => {
                if (e.target === attachmentModalEl) {
                    attachmentModalEl.style.display = 'none';
                }
            });
        }
        
        function sendMessage() {
            const text = messageInputEl.value.trim();
            if (!text || !currentSupplier) return;
            
            const newMessage = {
                sender: 'user',
                text: text,
                time: getCurrentTime(),
                type: 'text'
            };
            
            currentSupplier.messages.push(newMessage);
            renderMessages(currentSupplier.messages);
            messageInputEl.value = '';
            
            setTimeout(() => {
                simulateProviderResponse();
            }, 1000 + Math.random() * 2000);
        }
        
        function simulateProviderResponse() {
            if (!currentSupplier) return;
            
            const responses = [
                "Tenemos ese producto en stock, ¿cuántas unidades necesitas?",
                "El precio es $250. ¿Quieres que te lo reserve?",
                "¡Perfecto! Entregamos en 24 horas hábiles.",
                "Lamentablemente, ese producto está agotado por ahora.",
                "¿Quieres que te enviemos una lista completa de productos disponibles?",
                "Ofrecemos descuentos por compras mayores a 10 unidades.",
                "Tenemos nuevos productos, ¿te interesa?",
                "Consulta la garantía que ofrecemos en todos nuestros productos.",
                "¿Prefieres que te llamemos para más detalles?",
                "Puedes hacer tu pedido directamente aquí, te atenderemos rápido."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            const newMessage = {
                sender: 'provider',
                text: randomResponse,
                time: getCurrentTime(),
                type: 'text'
            };
            
            currentSupplier.messages.push(newMessage);
            renderMessages(currentSupplier.messages);
            
            currentSupplier.lastMessage = randomResponse;
            currentSupplier.time = 'Ahora';
            renderSupplierList();
        }
        
        function handleFileSelect(e) {
            const file = e.target.files[0];
            if (!file || !currentSupplier) return;
            
            attachmentModalEl.style.display = 'none';
            
            const fileType = file.type.split('/')[0];
            const fileName = file.name;
            const fileUrl = URL.createObjectURL(file);
            
            let newMessage = {
                sender: 'user',
                time: getCurrentTime()
            };
            
            if (fileType === 'image') {
                newMessage.type = 'image';
                newMessage.text = 'Te envío esta imagen:';
                newMessage.content = fileUrl;
            } else if (fileType === 'audio') {
                newMessage.type = 'audio';
                newMessage.text = 'Te envío este audio:';
                newMessage.content = fileUrl;
            } else {
                newMessage.type = 'text';
                newMessage.text = `Te envío el archivo: ${fileName}`;
            }
            
            currentSupplier.messages.push(newMessage);
            renderMessages(currentSupplier.messages);
            
            setTimeout(() => {
                simulateProviderResponse();
            }, 1500 + Math.random() * 2000);
        }
        
        function startAudioRecording() {
            attachmentModalEl.style.display = 'none';
            
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    audioRecorder = new MediaRecorder(stream);
                    audioChunks = [];
                    
                    audioRecorder.ondataavailable = e => {
                        audioChunks.push(e.data);
                    };
                    
                    audioRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                        const audioUrl = URL.createObjectURL(audioBlob);
                        
                        const newMessage = {
                            sender: 'user',
                            text: 'Te envío este audio:',
                            time: getCurrentTime(),
                            type: 'audio',
                            content: audioUrl
                        };
                        
                        currentSupplier.messages.push(newMessage);
                        renderMessages(currentSupplier.messages);
                        
                        setTimeout(() => {
                            simulateProviderResponse();
                        }, 1500 + Math.random() * 2000);
                    };
                    
                    audioRecorder.start();
                    
                    const stopRecording = confirm("Grabando audio... ¿Deseas detener la grabación?");
                    if (stopRecording) {
                        audioRecorder.stop();
                        stream.getTracks().forEach(track => track.stop());
                    }
                })
                .catch(err => {
                    console.error("Error al acceder al micrófono:", err);
                    alert("No se pudo acceder al micrófono. Permite el acceso para grabar audio.");
                });
        }
        
        function getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        
        document.addEventListener('DOMContentLoaded', init);
