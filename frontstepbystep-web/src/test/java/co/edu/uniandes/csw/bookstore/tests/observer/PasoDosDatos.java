/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.uniandes.csw.bookstore.tests.observer;

import co.edu.uniandes.csw.bookstore.entities.AuthorEntity;
import co.edu.uniandes.csw.bookstore.entities.BookEntity;
import co.edu.uniandes.csw.bookstore.entities.EditorialEntity;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.Initialized;
import javax.enterprise.event.Observes;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import uk.co.jemos.podam.api.PodamFactory;
import uk.co.jemos.podam.api.PodamFactoryImpl;

/**
 *
 * @author a.quintero10
 */
@ApplicationScoped
public class PasoDosDatos
{
    @PersistenceContext(unitName = "BookStorePU")
    private EntityManager em;

    PodamFactory factory = new PodamFactoryImpl();
    
    @Transactional
    void createTest(
            @Observes @Initialized(ApplicationScoped.class) final Object event)
    {
        for( int i = 0; i < 3; i++  ){
            em.persist(factory.manufacturePojo(BookEntity.class));
            em.persist(factory.manufacturePojo(AuthorEntity.class));
            em.persist(factory.manufacturePojo(EditorialEntity.class));
        }
    }
}