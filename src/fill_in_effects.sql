-- Positiv

INSERT INTO public.effect (
    name, duration, "maxLevel", "startEfficiency", "startPrice", 
    "efficiencyIncrease", "priceIncrease", "pathToIcon", "activationRoute"
) VALUES 
('Turbo Clicker', 0, 5, 2, 100, 1, 100, '/src/res/images/bild.jpg', 'start-async-gen'),

('Auto Clicker', 300, 5, 2, 100, 2, 100, '/src/res/images/autoclicker.jpg', 'auto-click'),

('Exponentieller Virus Generator', 20, 3, 1.2, 200, 0.3, 100, '/src/res/images/exponent.jpg', 'exp-virus'),

('Kritische Viren', 60, 4, 25, 300, 25, 150, '/src/res/images/crit.jpg', 'crit-click');

-- Negativ

INSERT INTO public.effect (
    name, duration, "maxLevel", "startEfficiency", "startPrice", 
    "efficiencyIncrease", "priceIncrease", "pathToIcon", "activationRoute"
) VALUES 
('Reverse Engineered Virus', 10, 1, -1, 1000, 0, 0, '/src/res/images/reverse.jpg', 'reverse-click'),

('DDoS', 20, 4, 0.25, 200, 0.25, 200, '/src/res/images/ddos.jpg', 'ddos-delay'),

('Virus der die Punkte anderer Leute absaugt', 30, 4, 0.25, 300, 0.25, 150, '/src/res/images/leech.jpg', 'drain-virus'),

('Pop-Up-Inator3000', 0, 1, 0, 500, 0, 0, '/src/res/images/popup.jpg', 'popup-alert');

-- Speziell

INSERT INTO public.effect (
    name, duration, "maxLevel", "startEfficiency", "startPrice", 
    "efficiencyIncrease", "priceIncrease", "pathToIcon", "activationRoute"
) VALUES 
('Glücksspiel Virus', 0, 1, 0, 200, 0, 0, '/src/res/images/gamble.jpg', 'gamble-virus'),

('Kommunismus Virus', 0, 1, 100, 750, 0, 0, '/src/res/images/communism.jpg', 'redistribute');
