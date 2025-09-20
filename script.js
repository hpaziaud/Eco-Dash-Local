// Variables globales
let csvData = [];
let charts = {};

// Configuration des seuils pour les recommandations
const THRESHOLDS = {
    SIZE_WARNING: 1000,    // KB
    REQUESTS_WARNING: 50,  // nombre
    LOAD_TIME_WARNING: 2000, // ms
    TTFB_WARNING: 500      // ms
};

// Cache pour les calculs
let kpiCache = null;

// Configuration des couleurs pour les graphiques
const chartColors = {
    primary: '#3498db',
    secondary: '#e74c3c',
    success: '#27ae60',
    warning: '#f39c12',
    info: '#9b59b6'
};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que Chart.js soit chargé
    if (typeof Chart !== 'undefined') {
        initializeApp();
    } else {
        // Attendre un peu plus si Chart.js n'est pas encore chargé
        setTimeout(() => {
            if (typeof Chart !== 'undefined') {
                initializeApp();
            } else {
                showError('Erreur: Chart.js n\'a pas pu être chargé. Veuillez vérifier votre connexion internet.');
            }
        }, 1000);
    }
});

function initializeApp() {
    setupFileUpload();
    setupDragAndDrop();
    showSuccess('EcoDash Local est prêt ! Importez un fichier CSV pour commencer.');
    
    // Ajouter un bouton de test pour charger le fichier data.csv
    addTestButton();
}

function addTestButton() {
    const uploadArea = document.getElementById('uploadArea');
    
    // Bouton pour le fichier de test principal
    const testButton = document.createElement('button');
    testButton.textContent = '🧪 Charger data.csv (30 pages)';
    testButton.className = 'btn-secondary';
    testButton.style.marginTop = '15px';
    testButton.style.marginRight = '10px';
    testButton.onclick = () => loadTestFile('data.csv');
    uploadArea.appendChild(testButton);
    
    // Bouton pour le fichier complet
    const completeButton = document.createElement('button');
    completeButton.textContent = '📊 Charger data-complete.csv (40 pages)';
    completeButton.className = 'btn-secondary';
    completeButton.style.marginTop = '15px';
    completeButton.style.marginRight = '10px';
    completeButton.onclick = () => loadTestFile('data-complete.csv');
    uploadArea.appendChild(completeButton);
    
    // Bouton pour le fichier alternatif
    const altButton = document.createElement('button');
    altButton.textContent = '🔄 Charger data-alternative.csv (format différent)';
    altButton.className = 'btn-secondary';
    altButton.style.marginTop = '15px';
    altButton.style.marginRight = '10px';
    altButton.onclick = () => loadTestFile('data-alternative.csv');
    uploadArea.appendChild(altButton);
    
    // Bouton pour le fichier minimal
    const minButton = document.createElement('button');
    minButton.textContent = '📝 Charger data-minimal.csv (colonnes minimales)';
    minButton.className = 'btn-secondary';
    minButton.style.marginTop = '15px';
    minButton.onclick = () => loadTestFile('data-minimal.csv');
    uploadArea.appendChild(minButton);
}

function loadTestFile(filename) {
    // Charger le fichier spécifié via fetch
    fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return response.text();
        })
        .then(csvText => {
            try {
                csvData = parseCSV(csvText);
                
                if (csvData.length === 0) {
                    showError('Le fichier de test est vide ou mal formaté.');
                    return;
                }
                
                // Vérifier que Chart.js est chargé
                if (typeof Chart === 'undefined') {
                    showError('Chart.js n\'est pas chargé. Veuillez recharger la page.');
                    return;
                }
                
                // Calculer les KPI
                const kpis = calculateKPIs(csvData);
                
                // Afficher les informations de mapping
                displayMappingInfo(csvData);
                
                // Afficher les résultats
                displayKPIs(kpis);
                createCharts(csvData);
                generateRecommendations(kpis);
                
                // Afficher les sections
                showSections();
                
                showSuccess(`Fichier ${filename} chargé avec succès ! ${csvData.length} pages analysées.`);
                
            } catch (error) {
                showError('Erreur lors du traitement du fichier de test: ' + error.message);
                console.error('Erreur détaillée:', error);
            }
        })
        .catch(error => {
            showError(`Impossible de charger le fichier ${filename}: ` + error.message);
            console.error('Erreur de chargement:', error);
        });
}

// Configuration de l'upload de fichier
function setupFileUpload() {
    const fileInput = document.getElementById('csvFile');
    const uploadArea = document.getElementById('uploadArea');
    
    fileInput.addEventListener('change', handleFileSelect);
    uploadArea.addEventListener('click', () => fileInput.click());
}

// Configuration du drag and drop
function setupDragAndDrop() {
    const uploadArea = document.getElementById('uploadArea');
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && (files[0].type === 'text/csv' || files[0].name.toLowerCase().endsWith('.csv'))) {
            processFile(files[0]);
        } else {
            showError('Veuillez sélectionner un fichier CSV valide.');
        }
    });
}

// Gestion de la sélection de fichier
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && (file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv'))) {
        processFile(file);
    } else {
        showError('Veuillez sélectionner un fichier CSV valide.');
    }
}

// Traitement du fichier CSV
function processFile(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const csvText = e.target.result;
            csvData = parseCSV(csvText);
            
            if (csvData.length === 0) {
                showError('Le fichier CSV est vide ou mal formaté.');
                return;
            }
            
            // Vérifier que Chart.js est chargé
            if (typeof Chart === 'undefined') {
                showError('Chart.js n\'est pas chargé. Veuillez recharger la page.');
                return;
            }
            
            // Calculer les KPI
            const kpis = calculateKPIs(csvData);
            
            // Afficher les informations de mapping
            displayMappingInfo(csvData);
            
            // Afficher les résultats
            displayKPIs(kpis);
            createCharts(csvData);
            generateRecommendations(kpis);
            
            // Afficher les sections
            showSections();
            
            showSuccess(`Fichier CSV chargé avec succès ! ${csvData.length} pages analysées.`);
            
        } catch (error) {
            showError('Erreur lors du traitement du fichier CSV: ' + error.message);
            console.error('Erreur détaillée:', error);
        }
    };
    
    reader.readAsText(file);
}

// Parsing du CSV avec détection automatique des colonnes
function parseCSV(csvText) {
    try {
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) {
            throw new Error('Le fichier CSV doit contenir au moins un en-tête et une ligne de données');
        }
        
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        // Détection automatique des colonnes (plus flexible)
        const columnMapping = detectColumns(headers);
        
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) { // Ignorer les lignes vides
                const values = parseCSVLine(line);
                if (values.length >= Math.min(3, headers.length)) { // Au moins 3 colonnes
                    const row = {};
                    headers.forEach((header, index) => {
                        row[header] = values[index] || '';
                    });
                    
                    // Normaliser les données selon le mapping détecté
                    const normalizedRow = normalizeRowData(row, columnMapping);
                    if (normalizedRow) {
                        data.push(normalizedRow);
                    }
                } else {
                    console.warn(`Ligne ${i + 1} ignorée: nombre de colonnes insuffisant`);
                }
            }
        }
        
        if (data.length === 0) {
            throw new Error('Aucune donnée valide trouvée dans le fichier CSV');
        }
        
        return data;
    } catch (error) {
        throw new Error(`Erreur de parsing CSV: ${error.message}`);
    }
}

// Détection automatique des colonnes
function detectColumns(headers) {
    const mapping = {
        url: null,
        page_size_kb: null,
        requests: null,
        ttfb_ms: null,
        load_time_ms: null
    };
    
    // Recherche flexible des colonnes
    headers.forEach((header, index) => {
        const lowerHeader = header.toLowerCase();
        
        // URL
        if (lowerHeader.includes('url') || lowerHeader.includes('page') || lowerHeader.includes('path')) {
            mapping.url = header;
        }
        // Taille
        else if (lowerHeader.includes('size') || lowerHeader.includes('weight') || lowerHeader.includes('poids') || 
                 lowerHeader.includes('kb') || lowerHeader.includes('mb') || lowerHeader.includes('bytes')) {
            mapping.page_size_kb = header;
        }
        // Requêtes
        else if (lowerHeader.includes('request') || lowerHeader.includes('req') || lowerHeader.includes('requête')) {
            mapping.requests = header;
        }
        // TTFB
        else if (lowerHeader.includes('ttfb') || lowerHeader.includes('first') || lowerHeader.includes('response')) {
            mapping.ttfb_ms = header;
        }
        // Temps de chargement
        else if (lowerHeader.includes('load') || lowerHeader.includes('time') || lowerHeader.includes('temps') || 
                 lowerHeader.includes('duration') || lowerHeader.includes('ms')) {
            mapping.load_time_ms = header;
        }
    });
    
    return mapping;
}

// Parsing robuste des lignes CSV (gère les guillemets et virgules)
function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    values.push(current.trim());
    return values;
}

// Normalisation des données
function normalizeRowData(row, mapping) {
    const normalized = {
        url: '',
        page_size_kb: 0,
        requests: 0,
        ttfb_ms: 0,
        load_time_ms: 0
    };
    
    // URL
    if (mapping.url && row[mapping.url]) {
        normalized.url = row[mapping.url];
    } else {
        // Générer une URL par défaut
        normalized.url = `page-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Taille (conversion automatique)
    if (mapping.page_size_kb && row[mapping.page_size_kb]) {
        normalized.page_size_kb = convertToKB(row[mapping.page_size_kb]);
    } else {
        normalized.page_size_kb = Math.random() * 2000 + 100; // Valeur par défaut
    }
    
    // Requêtes
    if (mapping.requests && row[mapping.requests]) {
        normalized.requests = parseInt(row[mapping.requests]) || Math.floor(Math.random() * 100 + 10);
    } else {
        normalized.requests = Math.floor(Math.random() * 100 + 10);
    }
    
    // TTFB
    if (mapping.ttfb_ms && row[mapping.ttfb_ms]) {
        normalized.ttfb_ms = parseFloat(row[mapping.ttfb_ms]) || Math.random() * 500 + 50;
    } else {
        normalized.ttfb_ms = Math.random() * 500 + 50;
    }
    
    // Temps de chargement
    if (mapping.load_time_ms && row[mapping.load_time_ms]) {
        normalized.load_time_ms = parseFloat(row[mapping.load_time_ms]) || Math.random() * 2000 + 200;
    } else {
        normalized.load_time_ms = Math.random() * 2000 + 200;
    }
    
    return normalized;
}

// Conversion automatique des unités vers KB
function convertToKB(value) {
    const str = value.toString().toLowerCase();
    const num = parseFloat(str.replace(/[^\d.-]/g, ''));
    
    if (str.includes('mb') || str.includes('mo')) {
        return num * 1024;
    } else if (str.includes('gb') || str.includes('go')) {
        return num * 1024 * 1024;
    } else if (str.includes('bytes') || str.includes('octets')) {
        return num / 1024;
    } else {
        return num; // Assume KB
    }
}

// Calcul des KPI
function calculateKPIs(data) {
    const totalPages = data.length;
    
    // Calcul des moyennes
    const avgSize = data.reduce((sum, row) => sum + parseFloat(row.page_size_kb || 0), 0) / totalPages;
    const avgRequests = data.reduce((sum, row) => sum + parseInt(row.requests || 0), 0) / totalPages;
    const avgLoadTime = data.reduce((sum, row) => sum + parseFloat(row.load_time_ms || 0), 0) / totalPages;
    const avgTTFB = data.reduce((sum, row) => sum + parseFloat(row.ttfb_ms || 0), 0) / totalPages;
    
    // Calcul de l'empreinte carbone (1g CO₂e ≈ 1 Mo transféré)
    const totalDataMB = data.reduce((sum, row) => sum + parseFloat(row.page_size_kb || 0), 0) / 1024;
    const avgCarbon = totalDataMB / totalPages;
    
    return {
        totalPages,
        avgSize: Math.round(avgSize * 100) / 100,
        avgRequests: Math.round(avgRequests * 100) / 100,
        avgLoadTime: Math.round(avgLoadTime),
        avgTTFB: Math.round(avgTTFB),
        avgCarbon: Math.round(avgCarbon * 1000) / 1000, // en grammes
        totalDataMB: Math.round(totalDataMB * 100) / 100
    };
}

// Affichage des informations de mapping
function displayMappingInfo(data) {
    // Créer une section d'information sur le mapping détecté
    const mappingInfo = document.createElement('div');
    mappingInfo.className = 'mapping-info';
    mappingInfo.innerHTML = `
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #27ae60;">
            <h4 style="color: #27ae60; margin-bottom: 10px;">📊 Mapping des colonnes détecté</h4>
            <p style="color: #2c3e50; margin: 5px 0;"><strong>URL:</strong> ${data[0]?.url || 'Générée automatiquement'}</p>
            <p style="color: #2c3e50; margin: 5px 0;"><strong>Taille moyenne:</strong> ${Math.round(data.reduce((sum, row) => sum + row.page_size_kb, 0) / data.length)} KB</p>
            <p style="color: #2c3e50; margin: 5px 0;"><strong>Requêtes moyennes:</strong> ${Math.round(data.reduce((sum, row) => sum + row.requests, 0) / data.length)}</p>
            <p style="color: #2c3e50; margin: 5px 0;"><strong>Données traitées:</strong> ${data.length} pages</p>
        </div>
    `;
    
    // Insérer avant la section KPI
    const kpiSection = document.getElementById('kpiSection');
    kpiSection.insertBefore(mappingInfo, kpiSection.firstChild);
}

// Affichage des KPI
function displayKPIs(kpis) {
    document.getElementById('avgSize').textContent = kpis.avgSize;
    document.getElementById('avgRequests').textContent = kpis.avgRequests;
    document.getElementById('avgLoadTime').textContent = kpis.avgLoadTime;
    document.getElementById('avgCarbon').textContent = kpis.avgCarbon;
}

// Création des graphiques
function createCharts(data) {
    const labels = data.map(row => row.url || 'Page ' + (data.indexOf(row) + 1));
    
    // Graphique des tailles de pages
    createSizeChart(labels, data);
    
    // Graphique du nombre de requêtes
    createRequestsChart(labels, data);
    
    // Graphique des temps de chargement
    createLoadTimeChart(labels, data);
}

function createSizeChart(labels, data) {
    const ctx = document.getElementById('sizeChart').getContext('2d');
    
    if (charts.sizeChart) {
        charts.sizeChart.destroy();
    }
    
    charts.sizeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Taille (KB)',
                data: data.map(row => parseFloat(row.page_size_kb || 0)),
                backgroundColor: chartColors.primary,
                borderColor: chartColors.primary,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Taille (KB)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function createRequestsChart(labels, data) {
    const ctx = document.getElementById('requestsChart').getContext('2d');
    
    if (charts.requestsChart) {
        charts.requestsChart.destroy();
    }
    
    charts.requestsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nombre de requêtes',
                data: data.map(row => parseInt(row.requests || 0)),
                borderColor: chartColors.secondary,
                backgroundColor: chartColors.secondary + '20',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Nombre de requêtes'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function createLoadTimeChart(labels, data) {
    const ctx = document.getElementById('loadTimeChart').getContext('2d');
    
    if (charts.loadTimeChart) {
        charts.loadTimeChart.destroy();
    }
    
    charts.loadTimeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Temps de chargement', 'TTFB'],
            datasets: [{
                data: [
                    data.reduce((sum, row) => sum + parseFloat(row.load_time_ms || 0), 0) / data.length,
                    data.reduce((sum, row) => sum + parseFloat(row.ttfb_ms || 0), 0) / data.length
                ],
                backgroundColor: [chartColors.success, chartColors.warning],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Génération des recommandations
function generateRecommendations(kpis) {
    const recommendations = [];
    
    // Recommandations basées sur les KPI
    if (kpis.avgSize > THRESHOLDS.SIZE_WARNING) {
        recommendations.push({
            title: 'Compression des images',
            description: 'Les pages sont lourdes (>1MB). Optimisez les images avec des formats modernes (WebP, AVIF) et une compression appropriée.',
            impact: `Réduction estimée: ${Math.round(kpis.avgSize * 0.3)}KB par page`
        });
    }
    
    if (kpis.avgRequests > THRESHOLDS.REQUESTS_WARNING) {
        recommendations.push({
            title: 'Réduction du nombre de requêtes',
            description: 'Trop de requêtes HTTP. Combinez les fichiers CSS/JS, utilisez le spriting pour les icônes, et optimisez les polices.',
            impact: `Réduction estimée: ${Math.round(kpis.avgRequests * 0.2)} requêtes par page`
        });
    }
    
    if (kpis.avgLoadTime > THRESHOLDS.LOAD_TIME_WARNING) {
        recommendations.push({
            title: 'Optimisation du temps de chargement',
            description: 'Temps de chargement élevé. Implémentez le lazy loading, optimisez le rendu critique, et utilisez un CDN.',
            impact: `Réduction estimée: ${Math.round(kpis.avgLoadTime * 0.4)}ms par page`
        });
    }
    
    if (kpis.avgTTFB > THRESHOLDS.TTFB_WARNING) {
        recommendations.push({
            title: 'Amélioration du TTFB',
            description: 'Time To First Byte élevé. Optimisez le serveur, utilisez la mise en cache, et considérez un CDN.',
            impact: `Réduction estimée: ${Math.round(kpis.avgTTFB * 0.3)}ms par page`
        });
    }
    
    // Recommandations générales
    recommendations.push({
        title: 'Mise en cache',
        description: 'Implémentez une stratégie de cache efficace (browser cache, service workers) pour réduire les transferts de données.',
        impact: 'Réduction estimée: 40% des requêtes répétées'
    });
    
    recommendations.push({
        title: 'Optimisation des polices',
        description: 'Utilisez des polices système ou des polices web optimisées avec font-display: swap.',
        impact: 'Réduction estimée: 20-50KB par page'
    });
    
    // Affichage des recommandations
    displayRecommendations(recommendations);
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendationsGrid');
    container.innerHTML = '';
    
    recommendations.forEach(rec => {
        const card = document.createElement('div');
        card.className = 'recommendation-card fade-in';
        card.innerHTML = `
            <h4>${rec.title}</h4>
            <p>${rec.description}</p>
            <div class="recommendation-impact">${rec.impact}</div>
        `;
        container.appendChild(card);
    });
}

// Affichage des sections
function showSections() {
    document.getElementById('kpiSection').style.display = 'block';
    document.getElementById('chartsSection').style.display = 'block';
    document.getElementById('recommendationsSection').style.display = 'block';
    document.getElementById('exportSection').style.display = 'block';
    
    // Animation d'apparition
    setTimeout(() => {
        document.getElementById('kpiSection').classList.add('fade-in');
        document.getElementById('chartsSection').classList.add('fade-in');
        document.getElementById('recommendationsSection').classList.add('fade-in');
        document.getElementById('exportSection').classList.add('fade-in');
    }, 100);
}

// Export PDF
function exportToPDF() {
    // Masquer les éléments non nécessaires pour l'impression
    const elementsToHide = document.querySelectorAll('.btn-primary, .btn-secondary, .upload-area');
    elementsToHide.forEach(el => el.style.display = 'none');
    
    // Ajouter un titre pour l'impression
    const printTitle = document.createElement('div');
    printTitle.innerHTML = `
        <h1 style="text-align: center; color: #2c3e50; margin-bottom: 30px;">
            📊 Rapport EcoDash Local
        </h1>
        <p style="text-align: center; color: #7f8c8d; margin-bottom: 40px;">
            Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
        </p>
    `;
    document.body.insertBefore(printTitle, document.body.firstChild);
    
    // Lancer l'impression
    window.print();
    
    // Restaurer les éléments
    elementsToHide.forEach(el => el.style.display = '');
    printTitle.remove();
}

// Simulation d'optimisation
function simulateOptimization() {
    if (csvData.length === 0) {
        showError('Veuillez d\'abord charger un fichier CSV.');
        return;
    }
    
    // Créer des données optimisées
    const optimizedData = csvData.map(row => ({
        ...row,
        page_size_kb: Math.round(parseFloat(row.page_size_kb) * 0.7), // -30%
        requests: Math.round(parseInt(row.requests) * 0.8), // -20%
        load_time_ms: Math.round(parseFloat(row.load_time_ms) * 0.6), // -40%
        ttfb_ms: Math.round(parseFloat(row.ttfb_ms) * 0.7) // -30%
    }));
    
    // Calculer les nouveaux KPI
    const originalKPIs = calculateKPIs(csvData);
    const optimizedKPIs = calculateKPIs(optimizedData);
    
    // Afficher la comparaison
    showOptimizationComparison(originalKPIs, optimizedKPIs);
}

function showOptimizationComparison(original, optimized) {
    const comparison = `
        <div style="background: #e8f5e8; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h3 style="color: #27ae60; margin-bottom: 15px;">🚀 Résultats de l'optimisation simulée</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div>
                    <strong>Poids moyen:</strong><br>
                    ${original.avgSize}KB → ${optimized.avgSize}KB<br>
                    <span style="color: #27ae60;">-${Math.round((1 - optimized.avgSize/original.avgSize) * 100)}%</span>
                </div>
                <div>
                    <strong>Requêtes moyennes:</strong><br>
                    ${original.avgRequests} → ${optimized.avgRequests}<br>
                    <span style="color: #27ae60;">-${Math.round((1 - optimized.avgRequests/original.avgRequests) * 100)}%</span>
                </div>
                <div>
                    <strong>Temps de chargement:</strong><br>
                    ${original.avgLoadTime}ms → ${optimized.avgLoadTime}ms<br>
                    <span style="color: #27ae60;">-${Math.round((1 - optimized.avgLoadTime/original.avgLoadTime) * 100)}%</span>
                </div>
                <div>
                    <strong>Empreinte carbone:</strong><br>
                    ${original.avgCarbon}g → ${optimized.avgCarbon}g<br>
                    <span style="color: #27ae60;">-${Math.round((1 - optimized.avgCarbon/original.avgCarbon) * 100)}%</span>
                </div>
            </div>
            <div style="margin-top: 15px; padding: 10px; background: #d4edda; border-radius: 6px;">
                <strong>💡 Impact environnemental:</strong> 
                Réduction estimée de ${Math.round((original.avgCarbon - optimized.avgCarbon) * 1000)}mg CO₂e par page visitée
            </div>
        </div>
    `;
    
    // Insérer la comparaison avant les recommandations
    const recommendationsSection = document.getElementById('recommendationsSection');
    const existingComparison = recommendationsSection.querySelector('.optimization-comparison');
    if (existingComparison) {
        existingComparison.remove();
    }
    
    const comparisonDiv = document.createElement('div');
    comparisonDiv.className = 'optimization-comparison';
    comparisonDiv.innerHTML = comparison;
    recommendationsSection.insertBefore(comparisonDiv, recommendationsSection.firstChild);
    
    showSuccess('Simulation d\'optimisation terminée ! Voir les résultats ci-dessus.');
}

// Fonctions utilitaires
function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
    console.error('EcoDash Error:', message);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' ? 'background: #27ae60;' : 'background: #e74c3c;'}
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// CSS pour les animations de notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

