import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpRequest
import org.springframework.http.client.*
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.client.OAuth2AuthorizeRequest
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizedClientManager
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository
import org.springframework.web.client.RestTemplate

@Configuration
class RestTemplateConfig(
    private val clientRegistrationRepository: ClientRegistrationRepository,
    private val authorizedClientRepository: OAuth2AuthorizedClientRepository
) {
    @Value("\${oauth2.client.registrationId}")
    private lateinit var registrationId: String

    @Bean
    fun authorizedClientManager(
        clientRegistrationRepository: ClientRegistrationRepository,
        authorizedClientRepository: OAuth2AuthorizedClientRepository
    ): OAuth2AuthorizedClientManager {
        return DefaultOAuth2AuthorizedClientManager(
            clientRegistrationRepository, authorizedClientRepository
        )
    }

    @Bean
    fun restTemplate(authorizedClientManager: OAuth2AuthorizedClientManager): RestTemplate {
        val restTemplate = RestTemplate(
            BufferingClientHttpRequestFactory(SimpleClientHttpRequestFactory())
        )
        restTemplate.interceptors.add(ClientHttpRequestInterceptor { request: HttpRequest, body: ByteArray, execution: ClientHttpRequestExecution ->
            val authentication = SecurityContextHolder.getContext().authentication
            val clientRegistration = clientRegistrationRepository.findByRegistrationId(registrationId)
            val authorizeRequest = OAuth2AuthorizeRequest.withClientRegistrationId(registrationId)
                .principal(authentication)
                .build()
            val client = authorizedClientManager.authorize(authorizeRequest)
            if (client != null) {
                request.headers.setBearerAuth(client.accessToken.tokenValue)
            }
            execution.execute(request, body)
        })

        return restTemplate
    }
    
    @Bean
    fun clientRegistrationRepository(): ClientRegistrationRepository {
        val registrationId = "your_registration_id_here"
        val clientId = "your_client_id_here"
        val clientSecret = "your_client_secret_here"
        val accessTokenUri = "your_access_token_uri_here"

        val clientRegistration = ClientRegistration.withRegistrationId(registrationId)
            .clientId(clientId)
            .clientSecret(clientSecret)
            .clientAuthenticationMethod(ClientAuthenticationMethod.BASIC)
            .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
            .scope("your_scope_here")
            .tokenUri(accessTokenUri)
            .build()

        return InMemoryClientRegistrationRepository(clientRegistration)
    }
    
}


// implementation("org.springframework.boot:spring-boot-starter-web")
// 	implementation("org.springframework.boot:spring-boot-starter-security")
// 	implementation("org.springframework.security:spring-security-oauth2-client")
// 	implementation("org.springframework.security:spring-security-oauth2-jose")
// 	implementation("org.springframework.security:spring-security-oauth2-jwt")
// 	implementation("org.springframework.security:spring-security-config")
// 	implementation("org.springframework.security:spring-security-data")
// 	implementation("org.springframework.security:spring-security-web")
// 	implementation("org.springframework.security:spring-security-core")
// 	implementation ("org.springframework.boot:spring-boot-starter-oauth2-client")
