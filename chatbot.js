        // --- Chatbot Logic ---
        const chatbotButton = document.getElementById('chatbot-button');
        const chatbotPanel = document.querySelector('.chatbot-panel');
        const chatbotClose = document.querySelector('.chatbot-close');
        const chatbotMessages = document.getElementById('chatbot-messages');
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');
    
        if (chatbotButton && chatbotPanel && chatbotClose && chatbotMessages && userInput && sendBtn) {
            let currentState = 'initial';
    
            // CORRECTED: Function declared before use.
            const handleUserSendMessage = () => {
                const message = userInput.value.trim();
                if (message !== '') {
                    addUserMessage(message);
                    userInput.value = '';
                    setTimeout(() => {
                        addBotMessage("I'm not sure how to respond to that. Please select one of the options I provided.");
                    }, 1000);
                }
            };

            chatbotButton.addEventListener('click', () => {
                chatbotPanel.classList.toggle('active');
                if (chatbotPanel.classList.contains('active') && chatbotMessages.children.length === 0) {
                    showInitialMessages();
                }
            });

               // Welcome Popup
       // setTimeout(() => {
        //    document.getElementById('welcomePopup').classList.add('active');
      //  }, 2000);
        
      //  document.getElementById('closePopup').addEventListener('click', () => {
      //      document.getElementById('welcomePopup').classList.remove('active');
      //  });
    
            chatbotClose.addEventListener('click', () => {
                chatbotPanel.classList.remove('active');
            });
    
            sendBtn.addEventListener('click', handleUserSendMessage);
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleUserSendMessage();
                }
            });
    
            const scrollToBottom = () => {
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            };
    
            const addBotMessage = (text, callback) => {
                const messageElement = document.createElement('div');
                messageElement.className = 'bot-message message';
                messageElement.innerHTML = '<div class="typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
                chatbotMessages.appendChild(messageElement);
                scrollToBottom();
                
                const typingTime = Math.min(text.length * 40, 2000);
                
                setTimeout(() => {
                    messageElement.innerHTML = text;
                    scrollToBottom();
                    if (callback) callback();
                }, typingTime);
            };
    
            const addUserMessage = (text) => {
                const messageElement = document.createElement('div');
                messageElement.className = 'user-message message';
                messageElement.textContent = text;
                chatbotMessages.appendChild(messageElement);
                scrollToBottom();
            };
    
            const addDynamicBotMessage = (html, selector, event, handler) => {
                const container = document.createElement('div');
                container.className = 'bot-message message';
                container.innerHTML = '<div class="typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
                chatbotMessages.appendChild(container);
                scrollToBottom();
                
                setTimeout(() => {
                    container.innerHTML = html;
                    container.querySelectorAll(selector).forEach(el => {
                        el.addEventListener(event, handler);
                    });
                    scrollToBottom();
                }, 1000);
            };
    
            const showInitialMessages = () => {
                addBotMessage("Hi 👋 I am SGS Chatbot Assistant, How Can I Help You Today?", () => {
                    setTimeout(() => {
                        addBotMessage("What service do you need?", showServiceCards);
                    }, 1000);
                });
            };
    
            const showServiceCards = () => {
                currentState = 'services';
                const cardsHtml = `
                    <div class="service-cards">
                        <div class="service-card" data-service="Logo-design"><i class="fas fa-paint-brush"></i> Logo Design Service</div>
                        <div class="service-card" data-service="about-us"><i class="fas fa-info-circle"></i> About Us </div>
                        <div class="service-card" data-service="consulting"><i class="fas fa-headset"></i> Consulting & Help </div>
                        <div class="service-card" data-service="support"><i class="fas fa-hands-helping"></i> Customer Support </div>
                    </div>`;
                addDynamicBotMessage(cardsHtml, '.service-card', 'click', (e) => {
                    handleServiceSelection(e.currentTarget.dataset.service);
                });
            };
    
            const handleServiceSelection = (service) => {
                const serviceCard = document.querySelector(`.service-card[data-service="${service}"]`);
                if (serviceCard) {
                    addUserMessage(serviceCard.textContent.trim());
                }
                document.querySelector('.service-cards')?.parentElement.remove();
                
                switch(service) {
                    case 'Logo-design':
                        currentState = 'Logo-design-options';
                        addBotMessage("Logo Design Service", showGraphicDesignOptions);
                        break;
                    case 'about-us':
                        currentState = 'about-us';
                        addBotMessage("Visit us to learn more..", () => {
                            showActionButton("Visit About Page", "fas fa-external-link-alt", "https://mxsulthan30-creator.github.io/SULTHAN-GRAPHIC-STUDIO-FF/");
                        });
                        break;
                    case 'consulting':
                        currentState = 'consulting';
                        addBotMessage("We are happy to assist you. Please direct your issue to us.", showConsultingInput);
                        break;
                    case 'support':
                        currentState = 'support';
                        addBotMessage("Visit to learn about our services..", () => {
                            showActionButton("Visit Services", "fas fa-external-link-alt", "https://mxsulthan30-creator.github.io/SULTHAN-GRAPHIC-STUDIO-FF/");
                        });
                        break;
                }
            };
    
            const showGraphicDesignOptions = () => {
                const optionsHtml = `
                    <div class="options-list">
                        <div class="option-item" data-option="know-services">a. Know our services</div>
                        <div class="option-item" data-option="portfolio">b.Portfolio & Samples</div>
                        <div class="option-item" data-option="buy-services">c.Buy Services </div>
                        <div class="option-item" data-option="place-order">d. Graphic Design Service (Place an Order)</div>
                    </div>`;
                addDynamicBotMessage(optionsHtml, '.option-item', 'click', (e) => {
                    handleGraphicDesignOption(e.currentTarget.dataset.option);
                });
            };
    
            const handleGraphicDesignOption = (option) => {
                const optionItem = document.querySelector(`.option-item[data-option="${option}"]`);
                if(optionItem) {
                    addUserMessage(optionItem.textContent.trim());
                }
                document.querySelector('.options-list')?.parentElement.remove();
                
                switch(option) {
                    case 'know-services':
                        addBotMessage("Visit to learn about our services..", () => {
                            showActionButton("Visit Services", "fas fa-external-link-alt", "https://mxsulthan30-creator.github.io/SULTHAN-GRAPHIC-STUDIO-FF/");
                        });
                        break;
                    case 'portfolio':
                        addBotMessage("Visit to view our designs and portfolio..", () => {
                            showActionButton("View Portfolio", "fas fa-external-link-alt", "https://mxsulthan30-creator.github.io/SULTHAN-GRAPHIC-STUDIO-FF/");
                        });
                        break;
                    case 'buy-services':
                        addBotMessage("Visit us to learn about our services and prices or to purchase.", () => {
                            showActionButton("Order Now", "fas fa-shopping-cart", "https://mxsulthan30-creator.github.io/SULTHAN-GRAPHIC-STUDIO-FF/");
                        });
                        break;
                    case 'place-order':
                        addBotMessage("Thank you! Place your service order with us now.", () => {
                            showActionButton("Order via WhatsApp", "fab fa-whatsapp", "https://wa.me/94762359717", true);
                        });
                        break;
                }
            };
    
            const showConsultingInput = () => {
                const inputHtml = `
                    <p>Please write your question or problem.:</p>
                    <div class="chatbot-input" style="padding: 10px 0 0 0; border: none; background: transparent;">
                        <input type="text" placeholder="Type your question..." id="consulting-input" style="width: 100%;">
                    </div>
                    <div class="action-buttons">
                        <button class="action-btn" id="send-consultation" style="margin-top: 10px;"><i class="fab fa-whatsapp"></i> Send Now</button>
                    </div>`;
                addDynamicBotMessage(inputHtml, '#send-consultation', 'click', () => {
                    const input = document.getElementById('consulting-input');
                    if (input && input.value.trim() !== '') {
                        const userQuery = input.value;
                        addUserMessage(userQuery);
                        input.value = '';
                        setTimeout(() => {
                            addBotMessage("Thank you! Your question has been forwarded to us. Our support team will respond to you shortly.", () => {
                                window.open(`https://wa.me/94762359717?text=${encodeURIComponent(userQuery)}`, '_blank');
                            });
                        }, 1000);
                    }
                });
            };
    
            const showActionButton = (text, icon, url, isWhatsApp = false) => {
                const buttonHtml = `<div class="action-buttons"><button class="action-btn" id="action-btn-dynamic"><i class="${icon}"></i> ${text}</button></div>`;
                addDynamicBotMessage(buttonHtml, '#action-btn-dynamic', 'click', () => {
                    const finalUrl = isWhatsApp ? `${url}?text=${encodeURIComponent("I need help with SGS services - " + new Date().toLocaleString())}` : url;
                    window.open(finalUrl, '_blank');
                });
            };
        }