<?php
/**
 * ===========================
 * Script d'envoi d'email - Congo Mining
 * ===========================
 * 
 * Ce fichier reçoit les données du formulaire en JSON
 * et envoie les emails aux adresses appropriées.
 * 
 * À placer à la racine du site web
 */

// En-têtes de sécurité
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Vérifier que c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
    exit;
}

// Récupérer les données JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Vérifier si les données sont valides
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Données invalides']);
    exit;
}

// Extraire et nettoyer les données
$name = isset($data['name']) ? htmlspecialchars(trim($data['name'])) : '';
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($data['phone']) ? htmlspecialchars(trim($data['phone'])) : '';
$message = isset($data['message']) ? htmlspecialchars(trim($data['message'])) : '';

// Valider les données obligatoires
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Champs obligatoires manquants']);
    exit;
}

// Valider le format de l'email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Format d\'email invalide']);
    exit;
}

// Vérifier la longueur minimale du message
if (strlen($message) < 10) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Le message doit contenir au moins 10 caractères']);
    exit;
}

// ===========================
// CONFIGURATION DES EMAILS
// ===========================

// Email de destination (adresse Congo Mining)
$destinataire = 'congominingcorporationsolution@gmail.com';

// Sujet du mail
$sujet = "Nouveau message de contact de " . $name;

// Corps du message au format texte
$corps = "Vous avez reçu un nouveau message de contact:\n\n";
$corps .= "======================================\n";
$corps .= "Nom: " . $name . "\n";
$corps .= "Email: " . $email . "\n";
$corps .= "Téléphone: " . ($phone ? $phone : "Non fourni") . "\n";
$corps .= "======================================\n\n";
$corps .= "Message:\n";
$corps .= $message . "\n\n";
$corps .= "======================================\n";
$corps .= "Date/Heure: " . date('d/m/Y à H:i:s') . "\n";
$corps .= "IP du visiteur: " . $_SERVER['REMOTE_ADDR'] . "\n";
$corps .= "======================================\n";

// En-têtes du mail
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Return-Path: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ===========================
// ENVOI DES EMAILS
// ===========================

$envoi_principal = false;
$envoi_confirmation = false;

// Envoyer le mail au gestionnaire (Congo Mining)
if (mail($destinataire, $sujet, $corps, $headers)) {
    $envoi_principal = true;
}

// Envoyer un email de confirmation au visiteur
$sujet_confirmation = "Confirmation - Votre message Congo Mining a été reçu";
$corps_confirmation = "Bonjour " . $name . ",\n\n";
$corps_confirmation .= "Merci de nous avoir contacté!\n\n";
$corps_confirmation .= "Nous avons bien reçu votre message et le traiterons avec attention.\n";
$corps_confirmation .= "Notre équipe vous recontactera par email ou par téléphone dans les plus brefs délais.\n\n";
$corps_confirmation .= "En attendant, si vous avez des questions urgentes, vous pouvez nous joindre:\n";
$corps_confirmation .= "📞 Téléphone: +243 904 313 362\n";
$corps_confirmation .= "📱 WhatsApp: +243 971 501 629\n";
$corps_confirmation .= "📍 Adresse: Boulevard du 30 Juin, Bâtiment Luxurus, Kinshasa-Gombe, RDC\n\n";
$corps_confirmation .= "Cordialement,\n";
$corps_confirmation .= "Équipe Congo Mining Corporation Solution SARLU\n\n";
$corps_confirmation .= "---\n";
$corps_confirmation .= "Ce message est une confirmation automatique. Veuillez ne pas y répondre.";

$headers_confirmation = "From: " . $destinataire . "\r\n";
$headers_confirmation .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($email, $sujet_confirmation, $corps_confirmation, $headers_confirmation)) {
    $envoi_confirmation = true;
}

// ===========================
// RÉPONSE AU CLIENT
// ===========================

if ($envoi_principal) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Votre message a été envoyé avec succès!',
        'confirmation_sent' => $envoi_confirmation
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
    ]);
}

// Enregistrer la tentative dans un log (optionnel)
$log_message = date('Y-m-d H:i:s') . " | De: " . $email . " | Sujet: " . $sujet . " | Succès: " . ($envoi_principal ? "OUI" : "NON") . "\n";
error_log($log_message, 3, 'contact-log.txt');

exit;
?>
